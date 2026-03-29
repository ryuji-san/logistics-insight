import { useParams, Link } from "react-router-dom";
import { articles } from "../data/articles";
import { categoryStyle } from "../utils/category";

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-3xl mb-3">📄</div>
        <p className="text-[13px] text-gray-400 mb-4">
          記事が見つかりません
        </p>
        <Link
          to="/articles"
          className="text-[12px] text-primary-600 no-underline font-medium"
        >
          ← 記事一覧に戻る
        </Link>
      </div>
    );
  }

  const style = categoryStyle(article.category);

  const related = articles.filter(
    (a) =>
      a.id !== article.id &&
      a.relatedThemes.some((t) => article.relatedThemes.includes(t))
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[11px] text-gray-300 mb-6 animate-fade-in">
        <Link to="/" className="hover:text-gray-500 no-underline text-gray-300 transition-colors">
          ホーム
        </Link>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link to="/articles" className="hover:text-gray-500 no-underline text-gray-300 transition-colors">
          記事一覧
        </Link>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-500 truncate max-w-[180px]">
          {article.title}
        </span>
      </nav>

      {/* Header */}
      <div className="mb-6 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${style.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {article.category}
          </span>
          {article.featured && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-600">
              注目
            </span>
          )}
        </div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-[1.6] mb-3">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-[12px] text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {article.publishedAt}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {article.sourceName}
          </span>
        </div>
      </div>

      {/* Source Link */}
      <div className="bg-gray-50 rounded-xl px-4 py-3 mb-6 animate-fade-in-up stagger-1">
        <div className="flex items-start gap-2">
          <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <div className="min-w-0">
            <p className="text-[10px] text-gray-400 font-medium mb-0.5">出典</p>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-primary-600 hover:text-primary-700 break-all leading-relaxed"
            >
              {article.sourceUrl}
            </a>
          </div>
        </div>
      </div>

      {/* Summary */}
      <section className="mb-5 animate-fade-in-up stagger-2">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-1 h-4 rounded-full bg-primary-500" />
          <h2 className="text-[14px] font-bold text-gray-900">要点</h2>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-[13px] text-gray-600 leading-[1.9] whitespace-pre-wrap">
            {article.summary}
          </p>
        </div>
      </section>

      {/* Implication */}
      <section className="mb-5 animate-fade-in-up stagger-3">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-1 h-4 rounded-full bg-amber-500" />
          <h2 className="text-[14px] font-bold text-gray-900">
            示唆・当社への影響
          </h2>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/30 rounded-xl border border-amber-100/60 p-5">
          <p className="text-[13px] text-gray-600 leading-[1.9] whitespace-pre-wrap">
            {article.implication}
          </p>
        </div>
      </section>

      {/* Tags & Themes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 animate-fade-in-up stagger-4">
        <div>
          <h2 className="text-[12px] font-bold text-gray-400 mb-2">タグ</h2>
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded-lg font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-[12px] font-bold text-gray-400 mb-2">
            関連テーマ
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {article.relatedThemes.map((theme) => (
              <span
                key={theme}
                className="text-[11px] bg-primary-50 text-primary-600 px-2.5 py-1 rounded-lg font-medium"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="mb-6 animate-fade-in-up stagger-5">
          <h2 className="text-[12px] font-bold text-gray-400 mb-2.5">
            関連する記事
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
            {related.map((a) => {
              const rs = categoryStyle(a.category);
              return (
                <Link
                  key={a.id}
                  to={`/articles/${a.id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/80 transition-colors no-underline group"
                >
                  <div className={`w-1 self-stretch rounded-full shrink-0 ${rs.dot}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-gray-800 group-hover:text-primary-700 transition-colors truncate">
                      {a.title}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {a.sourceName} · {a.publishedAt}
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

      {/* Back */}
      <div className="pt-4 border-t border-gray-100 animate-fade-in-up stagger-6">
        <Link
          to="/articles"
          className="inline-flex items-center gap-1 text-[13px] text-primary-500 hover:text-primary-700 no-underline font-medium transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
