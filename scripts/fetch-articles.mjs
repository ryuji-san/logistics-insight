/**
 * 物流関連の最新ニュースを取得して articles.json を更新するスクリプト
 *
 * 使い方:
 *   npm run fetch          ← 毎日これを実行するだけ
 *   npm run fetch:auto     ← Windows タスクスケジューラから自動実行用
 *
 * 仕組み:
 *   Google News RSS で物流関連キーワードを検索し、
 *   新着記事を articles.json に追加する
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_PATH = path.join(__dirname, "..", "src", "data", "articles.json");

// ---- 検索クエリ（Google News RSS） ----
const SEARCH_QUERIES = [
  {
    query: "物流 政策",
    defaultCategory: "物流政策",
  },
  {
    query: "物流 DX デジタル",
    defaultCategory: "物流DX",
  },
  {
    query: "物流 ロボット 自動運転 AI",
    defaultCategory: "AI・ロボティクス",
  },
  {
    query: "物流 脱炭素 EV グリーン",
    defaultCategory: "サステナビリティ",
  },
  {
    query: "トラックドライバー 人手不足 2024年問題",
    defaultCategory: "人材・労務",
  },
];

function buildGoogleNewsRssUrl(query) {
  const q = encodeURIComponent(query);
  return `https://news.google.com/rss/search?q=${q}&hl=ja&gl=JP&ceid=JP:ja`;
}

/**
 * シンプルなXMLパーサー（外部依存なし）
 */
function parseRssItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const c = match[1];
    const title =
      c.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/)?.[1]?.trim() ?? "";
    const link =
      c.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() ?? "";
    const pubDate =
      c.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim() ?? "";
    const source =
      c.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1]?.trim() ?? "";
    const description =
      c.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/)?.[1]?.trim() ?? "";

    if (title && !title.includes("Google ニュース")) {
      items.push({
        title: decodeHtmlEntities(title),
        link,
        pubDate,
        source: decodeHtmlEntities(source),
        description: stripHtml(decodeHtmlEntities(description)),
      });
    }
  }
  return items;
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/");
}

function stripHtml(str) {
  return str.replace(/<[^>]*>/g, "").trim();
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
    return d.toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function generateId(title, date) {
  const slug = title
    .replace(/[^\w\u3040-\u9FFF]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40);
  return `${date}-${slug}`.toLowerCase();
}

async function fetchQuery({ query, defaultCategory }) {
  const url = buildGoogleNewsRssUrl(query);
  try {
    console.log(`  📡 「${query}」を検索中...`);
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    if (!res.ok) {
      console.log(`  ⚠ HTTP ${res.status}`);
      return [];
    }
    const xml = await res.text();
    const items = parseRssItems(xml);
    console.log(`  ✓ ${items.length}件ヒット`);

    return items.slice(0, 5).map((item) => {
      const date = formatDate(item.pubDate);
      return {
        id: generateId(item.title, date),
        title: item.title,
        category: defaultCategory,
        publishedAt: date,
        sourceName: item.source || "ニュース",
        sourceUrl: item.link,
        summary: item.description || "（本文は出典リンクをご確認ください）",
        implication: "",
        tags: [],
        featured: false,
        relatedThemes: [],
      };
    });
  } catch (err) {
    console.log(`  ✗ エラー: ${err.message}`);
    return [];
  }
}

async function main() {
  const now = new Date();
  console.log(
    `\n🔄 物流インサイト — 記事取得 (${now.toLocaleDateString("ja-JP")})\n`
  );

  // 既存記事を読み込み
  let existing = [];
  try {
    existing = JSON.parse(fs.readFileSync(ARTICLES_PATH, "utf-8"));
  } catch {
    /* 初回は空 */
  }
  const existingIds = new Set(existing.map((a) => a.id));
  const existingTitles = new Set(existing.map((a) => a.title));
  console.log(`📂 既存記事: ${existing.length}件\n`);

  // 各クエリを順次実行
  const newArticles = [];
  for (const q of SEARCH_QUERIES) {
    const articles = await fetchQuery(q);
    for (const article of articles) {
      // タイトルの重複もチェック（IDだけだと同じ記事が別IDになる場合がある）
      if (!existingIds.has(article.id) && !existingTitles.has(article.title)) {
        newArticles.push(article);
        existingIds.add(article.id);
        existingTitles.add(article.title);
      }
    }
  }

  console.log(`\n📰 新規記事: ${newArticles.length}件`);

  if (newArticles.length === 0) {
    console.log("✅ 新しい記事はありませんでした。\n");
    return;
  }

  // 新しい記事を先頭に追加して日付でソート
  const merged = [...newArticles, ...existing].sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt)
  );

  // 最大100件に制限（古い記事を削除）
  const trimmed = merged.slice(0, 100);

  fs.writeFileSync(ARTICLES_PATH, JSON.stringify(trimmed, null, 2), "utf-8");
  console.log(`✅ articles.json を更新しました（合計 ${trimmed.length}件）`);

  // 追加された記事を表示
  console.log("\n--- 追加された記事 ---");
  for (const a of newArticles) {
    console.log(`  • ${a.title}`);
    console.log(`    ${a.sourceName} | ${a.publishedAt}`);
  }
  console.log("");
}

main();
