import { useParams, Link } from "react-router-dom";
import { articles } from "../data/articles";
import { categoryStyle } from "../utils/category";

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-sm text-gray-400 mb-3">記事が見つかりません</p>
        <Link to="/articles" className="text-sm text-primary-600 no-underline font-medium">
          ← 記事一覧に戻る
        </Link>
      </div>
    );
  }

  const style = categoryStyle(article.category);

  const related = articles.filter(
    (a) => a.id !== article.id && a.relatedThemes.some((t) => article.relatedThemes.includes(t))
  );

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-6 py-4 sm:py-8">

      {/* ── パンくず ── */}
      <nav className="flex items-center gap-1 text-[11px] text-gray-400 mb-4 animate-fade-in">
        <Link to="/" className="shrink-0 hover:text-gray-600 no-underline text-gray-400">ホーム</Link>
        <span className="shrink-0">/</span>
        <Link to="/articles" className="shrink-0 hover:text-gray-600 no-underline text-gray-400">記事一覧</Link>
        <span className="shrink-0">/</span>
        <span className="text-gray-500 truncate">{article.title}</span>
      </nav>

      {/* ── 記事ヘッダー ── */}
      <header className="mb-5 animate-fade-in-up">
        {/* タイトル */}
        <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed mb-3">
          {article.title}
        </h1>

        {/* メタ情報（カテゴリ・日付・出典を1行に） */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mb-3">
          <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded ${style.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {article.category}
          </span>
          {article.featured && (
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 ring-1 ring-amber-200/50">注目</span>
          )}
          <span className="text-[11px] text-gray-400">{article.publishedAt}</span>
          <span className="text-[11px] text-gray-400">{article.sourceName}</span>
        </div>

        {/* 出典リンク */}
        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[12px] text-primary-600 hover:text-primary-700 bg-primary-50 px-2.5 py-1 rounded-md transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          元の資料を見る
        </a>
      </header>

      <div className="section-divider" />

      {/* ── 1. 要点まとめ ── */}
      <section className="mb-6 animate-fade-in-up stagger-1">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-1 h-4.5 rounded-full bg-primary-500" />
          <h2 className="text-sm font-bold text-gray-900">要点まとめ</h2>
        </div>
        <div className="bg-white rounded-lg border border-gray-200/80 p-4">
          <p className="text-[14px] sm:text-[15px] text-gray-700 leading-[1.85] whitespace-pre-wrap">
            {article.summary}
          </p>
        </div>
      </section>

      {/* ── 2. カリツー視点での示唆 ── */}
      {article.implication && (
        <section className="mb-6 animate-fade-in-up stagger-2">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-1 h-4.5 rounded-full bg-amber-500" />
            <h2 className="text-sm font-bold text-gray-900">カリツー視点での示唆</h2>
          </div>
          <div className="bg-amber-50/60 rounded-lg border border-amber-200/50 p-4">
            <p className="text-[14px] sm:text-[15px] text-gray-700 leading-[1.85] whitespace-pre-wrap">
              {article.implication}
            </p>
          </div>
        </section>
      )}

      {/* ── 3. アクション ── */}
      {article.actionItems && article.actionItems.length > 0 && (
        <section className="mb-6 animate-fade-in-up stagger-3">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-1 h-4.5 rounded-full bg-blue-500" />
            <h2 className="text-sm font-bold text-gray-900">具体的アクション</h2>
          </div>
          <div className="bg-blue-50/50 rounded-lg border border-blue-200/50 p-4">
            <ul className="space-y-2.5">
              {article.actionItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── 4. 関連テーマ + タグ ── */}
      {(article.relatedThemes.length > 0 || article.tags.length > 0) && (
        <section className="mb-6 animate-fade-in-up stagger-4">
          {article.relatedThemes.length > 0 && (
            <div className="mb-3">
              <h2 className="text-[12px] font-bold text-gray-500 mb-2">関連テーマ</h2>
              <div className="flex flex-wrap gap-1.5">
                {article.relatedThemes.map((theme) => (
                  <span key={theme} className="text-[12px] bg-primary-50 text-primary-700 px-2.5 py-0.5 rounded-md font-medium">
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          )}
          {article.tags.length > 0 && (
            <div>
              <h2 className="text-[12px] font-bold text-gray-500 mb-2">タグ</h2>
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span key={tag} className="text-[12px] bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── 5. 関連記事 ── */}
      {related.length > 0 && (
        <section className="mb-6 animate-fade-in-up stagger-5">
          <h2 className="text-[12px] font-bold text-gray-500 mb-2.5">関連する記事</h2>
          <div className="bg-white rounded-lg border border-gray-200/80 divide-y divide-gray-100 overflow-hidden">
            {related.map((a) => {
              const rs = categoryStyle(a.category);
              return (
                <Link
                  key={a.id}
                  to={`/articles/${a.id}`}
                  className="flex items-center gap-2.5 px-3 py-3 hover:bg-gray-50/60 transition-colors no-underline group"
                >
                  <div className={`w-1 self-stretch rounded-full shrink-0 ${rs.dot}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-gray-800 group-hover:text-primary-700 transition-colors leading-snug">
                      {a.title}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {a.sourceName} ・ {a.publishedAt}
                    </p>
                  </div>
                  <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 戻るリンク ── */}
      <div className="pt-4 border-t border-gray-100 animate-fade-in-up stagger-6">
        <Link
          to="/articles"
          className="inline-flex items-center gap-1 text-[13px] text-primary-600 hover:text-primary-700 no-underline font-medium"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
