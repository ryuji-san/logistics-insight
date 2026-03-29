import type { Article } from "../types";
import fetchedArticles from "./articles.json";

// 手動管理の記事（要点・示唆つき + 重要度スコア）
const curatedArticles: Article[] = [
  {
    id: "meti-ai-robotics-2024",
    title: "AIロボティクス戦略検討会議 第1回事務局資料",
    category: "AI・ロボティクス",
    publishedAt: "2024-10-15",
    sourceName: "経済産業省",
    sourceUrl:
      "https://www.meti.go.jp/shingikai/mono_info_service/ai_robotics/001.html",
    summary:
      "経済産業省が立ち上げたAIロボティクス戦略検討会議の第1回事務局資料。物流・製造・インフラ分野におけるAI×ロボティクスの社会実装に向けた現状課題と方向性を整理。特に物流領域では、自動倉庫・ピッキングロボット・自動配送の技術動向を網羅し、2030年に向けた導入ロードマップの策定方針を示している。",
    implication:
      "当社の倉庫オペレーションや仕分け工程への自動化投資を検討する際の参考となる。特にピッキングロボットの導入コスト低下トレンドに注目。国の支援策（補助金・規制緩和）の方向性も把握しておくことで、投資判断のタイミングを見極められる。",
    tags: ["AI", "ロボティクス", "自動化", "倉庫", "国策"],
    featured: true,
    relatedThemes: ["倉庫自動化", "ラストワンマイル", "人手不足対策"],
    importance: 88,
  },
  {
    id: "mlit-logistics-policy-2030",
    title: "2030年度に向けた総合物流施策大綱に関する検討会 提言",
    category: "物流政策",
    publishedAt: "2024-08-30",
    sourceName: "国土交通省",
    sourceUrl:
      "https://www.mlit.go.jp/seisakutokatsu/freight/butsuryu_sesaku.html",
    summary:
      "次期総合物流施策大綱（2026〜2030年度）の策定に向けた有識者検討会の提言。2024年問題以降の物流持続可能性確保を最重要課題とし、①標準化・効率化、②デジタル化、③グリーン物流、④人材確保の4本柱で政策方向性を提示。",
    implication:
      "パレット標準化・共同配送といった業界横断の効率化施策は、当社のオペレーションにも直接影響する。特に荷主への働きかけ（適正運賃・リードタイム確保）に関する制度設計は、営業戦略にも関わる。",
    tags: ["物流政策", "2024年問題", "標準化", "グリーン物流", "人材確保"],
    featured: true,
    relatedThemes: ["2024年問題", "パレット標準化", "モーダルシフト", "ドライバー確保"],
    importance: 95,
  },
  {
    id: "meti-physical-internet-roadmap",
    title: "フィジカルインターネット・ロードマップ",
    category: "物流DX",
    publishedAt: "2024-06-20",
    sourceName: "経済産業省",
    sourceUrl:
      "https://www.meti.go.jp/shingikai/mono_info_service/physical_internet/index.html",
    summary:
      "経済産業省が策定したフィジカルインターネット実現に向けたロードマップ。荷物を標準化された容器で共有ネットワーク上を最適ルートで輸送する概念。2040年の完全実現を見据えた3段階アプローチを提示。",
    implication:
      "フィジカルインターネットの実現は物流業界全体のゲームチェンジとなりうる。当社としては、まずPhase1の業界内連携への参画を具体的に検討すべき。社内システムのAPI化・標準データフォーマット対応を中期IT計画に盛り込むことが望ましい。",
    tags: ["フィジカルインターネット", "共同配送", "標準化", "DX", "ロードマップ"],
    featured: true,
    relatedThemes: ["共同配送", "データ連携", "パレット標準化", "物流ネットワーク最適化"],
    importance: 92,
  },
  {
    id: "mlit-2024-problem-followup",
    title: "物流2024年問題の影響と対策フォローアップ調査",
    category: "物流政策",
    publishedAt: "2025-02-14",
    sourceName: "国土交通省",
    sourceUrl: "https://www.mlit.go.jp/jidosha/jidosha_tk4_000113.html",
    summary:
      "2024年4月の時間外労働上限規制適用後の実態調査。ドライバーの労働時間は平均8.2%短縮された一方、輸送能力の不足が特定路線で顕在化。中継輸送の導入企業は前年比2.3倍に増加。",
    implication:
      "中継輸送の成功事例を参考に、当社の長距離幹線便のオペレーション見直しを加速すべき。荷待ち時間削減に向けた荷主との交渉材料としても活用可能。",
    tags: ["2024年問題", "中継輸送", "労働時間", "荷主責任"],
    featured: false,
    relatedThemes: ["2024年問題", "ドライバー確保", "中継輸送"],
    importance: 90,
  },
  {
    id: "autonomous-driving-truck-2025",
    title: "自動運転トラック レベル4実証走行の成果と展望",
    category: "AI・ロボティクス",
    publishedAt: "2025-03-10",
    sourceName: "経済産業省",
    sourceUrl: "https://www.meti.go.jp/policy/mono_info_service/connected_industries/autonomous_truck.html",
    summary:
      "新東名高速道路で実施されたレベル4自動運転トラックの実証走行結果。深夜帯の高速道路における無人運行の技術的実現可能性が実証。2027年度の商用化に向けた制度整備スケジュールも提示。",
    implication:
      "2027年の商用化は当社の幹線輸送戦略に大きな影響を与える。早期にパートナー選定と実証参加を検討し、競合優位を確保すべき。",
    tags: ["自動運転", "レベル4", "幹線輸送", "実証実験"],
    featured: true,
    relatedThemes: ["倉庫自動化", "ドライバー確保", "人手不足対策"],
    importance: 93,
  },
  {
    id: "green-logistics-guideline-2025",
    title: "グリーン物流ガイドライン 改定版",
    category: "サステナビリティ",
    publishedAt: "2025-01-22",
    sourceName: "国土交通省・経済産業省",
    sourceUrl: "https://www.mlit.go.jp/seisakutokatsu/freight/green_logistics.html",
    summary:
      "カーボンニュートラルに向けたグリーン物流ガイドラインの改定版。CO2排出量の算定方法を国際標準に統一。荷主企業へのCO2可視化義務化スケジュール（2027年度〜）も盛り込み。",
    implication:
      "2027年のCO2可視化義務化は確定路線と捉え、算定システムの整備を前倒しで進めるべき。荷主への報告フォーマット準備が差別化要因になりうる。",
    tags: ["グリーン物流", "CO2", "EV", "カーボンニュートラル", "Scope3"],
    featured: false,
    relatedThemes: ["モーダルシフト", "EV導入", "サステナビリティ"],
    importance: 85,
  },
  {
    id: "logistics-dx-platform-report",
    title: "物流DXプラットフォームの社会実装に向けた報告書",
    category: "物流DX",
    publishedAt: "2025-03-05",
    sourceName: "デジタル庁・国土交通省",
    sourceUrl: "https://www.digital.go.jp/policies/logistics-dx",
    summary:
      "物流データの官民連携プラットフォーム構築に向けた検討報告書。「物流データハイウェイ」構想を提示。API標準仕様の策定状況、中小事業者向けSaaS型ツールの提供計画をまとめている。",
    implication:
      "物流データハイウェイへの早期接続は、今後の業界内でのポジショニングに関わる。社内システムのAPI対応状況を棚卸しし、接続準備を進めるべき。",
    tags: ["DX", "データ連携", "API", "プラットフォーム", "デジタル庁"],
    featured: true,
    relatedThemes: ["データ連携", "物流ネットワーク最適化", "共同配送"],
    importance: 87,
  },
  {
    id: "drone-delivery-regulation-2025",
    title: "ドローン配送に係る制度整備の方向性",
    category: "AI・ロボティクス",
    publishedAt: "2025-02-28",
    sourceName: "国土交通省",
    sourceUrl: "https://www.mlit.go.jp/koku/koku_tk10_000003.html",
    summary:
      "レベル4飛行の運用拡大に向けた制度整備方針。過疎地・離島での配送実証の成果を踏まえ、都市部での運用に向けたルールを提示。2026年度中の商用ドローン配送開始が目標。",
    implication:
      "ラストワンマイル配送の代替手段としてドローンの実用性が高まっている。過疎地・離島案件でのパイロット導入を検討しつつ、都市部展開に備えた知見蓄積を進めるべき。",
    tags: ["ドローン", "レベル4", "ラストワンマイル", "制度整備"],
    featured: false,
    relatedThemes: ["ラストワンマイル", "倉庫自動化", "人手不足対策"],
    importance: 78,
  },
  {
    id: "foreign-workers-logistics-2025",
    title: "物流分野における外国人材活用の実態と課題",
    category: "人材・労務",
    publishedAt: "2025-01-30",
    sourceName: "厚生労働省",
    sourceUrl: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/foreign_worker_logistics.html",
    summary:
      "物流分野における外国人労働者の就労実態調査結果。特定技能制度を活用した就労者数は前年比45%増。多言語対応のマニュアル整備や生活支援が定着率向上のカギとなることが示された。",
    implication:
      "人手不足が深刻化する中、外国人材の活用は不可避。特定技能制度の活用に向け、受入れ体制の整備を人事部門と連携して推進すべき。",
    tags: ["外国人材", "特定技能", "人手不足", "倉庫", "定着率"],
    featured: false,
    relatedThemes: ["人手不足対策", "ドライバー確保"],
    importance: 80,
  },
];

/**
 * 自動取得記事の重要度スコアを計算
 * - 新しいほど高い（直近1週間 = 65, 1ヶ月以内 = 55, それ以上 = 40）
 * - 政府系ソースは +5
 */
function scoreAutoArticle(a: Article): number {
  const now = Date.now();
  const pub = new Date(a.publishedAt).getTime();
  const daysAgo = (now - pub) / (1000 * 60 * 60 * 24);

  let score = daysAgo <= 7 ? 65 : daysAgo <= 30 ? 55 : 40;

  const govSources = ["国土交通省", "経済産業省", "デジタル庁", "厚生労働省", "maff.go.jp"];
  if (govSources.some((s) => a.sourceName.includes(s) || a.sourceUrl.includes(s))) {
    score += 5;
  }
  return score;
}

// RSS から取得した記事とマージ
const imported = (fetchedArticles as Article[])
  .filter((a) => !curatedArticles.some((c) => c.id === a.id))
  .map((a) => ({ ...a, importance: a.importance ?? scoreAutoArticle(a) }));

export const articles: Article[] = [...curatedArticles, ...imported].sort(
  (a, b) => b.publishedAt.localeCompare(a.publishedAt)
);

/** 重要度スコアでソートしたトップN */
export function getTrendingArticles(n = 5): Article[] {
  return [...articles]
    .sort((a, b) => (b.importance ?? 0) - (a.importance ?? 0))
    .slice(0, n);
}

export const categories = [...new Set(articles.map((a) => a.category))];
