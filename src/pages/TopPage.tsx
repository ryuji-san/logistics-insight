import { Link } from "react-router-dom";
import { articles, categories, getTrendingArticles } from "../data/articles";
import ArticleCard from "../components/ArticleCard";
import { categoryStyle } from "../utils/category";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 6) return "お疲れさまです";
  if (h < 11) return "おはようございます";
  if (h < 14) return "こんにちは";
  if (h < 18) return "お疲れさまです";
  return "お疲れさまです";
}

export default function TopPage() {
  const today = new Date();
  const trending = getTrendingArticles(5);
  const recentArticles = [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 5);
  const featuredArticles = articles.filter((a) => a.featured).slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8">

      {/* ── Hero ── */}
      <section className="mb-5 sm:mb-8 animate-fade-in-up">
        <div className="rounded-lg bg-primary-700 hero-pattern p-4 sm:p-6 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute bottom-[-20px] left-[30%] w-24 h-24 bg-white/3 rounded-full" />
          <p className="text-primary-200 text-[13px] sm:text-[12px] mb-0.5">{getGreeting()}</p>
          <h1 className="text-base sm:text-lg font-bold mb-1">物流インサイト</h1>
          <p className="text-primary-100 text-[13px] sm:text-[13px] leading-relaxed max-w-md">
            物流政策・業界動向の要点と示唆をまとめて共有。現場の高度化・DX検討にお役立てください。
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <Link
              to="/articles"
              className="inline-flex items-center gap-1 bg-white text-primary-700 font-semibold text-[13px] sm:text-[13px] px-3.5 py-1.5 rounded-md hover:bg-primary-50 transition-colors no-underline"
            >
              記事一覧を見る
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <span className="text-primary-200 text-[12px] sm:text-[11px]">
              {articles.length}件収録 ・ {today.getMonth() + 1}/{today.getDate()} 確認
            </span>
          </div>
        </div>
      </section>

      {/* ── トレンドTOP5 ── */}
      <section className="mb-5 sm:mb-8 animate-fade-in-up stagger-1">
        <h2 className="text-[14px] sm:text-[13px] font-bold text-gray-700 mb-2.5 flex items-center gap-1.5">
          <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" />
          </svg>
          これだけは押さえたい TOP 5
        </h2>
        <div className="bg-white rounded-lg border border-gray-200/80 divide-y divide-gray-100 overflow-hidden">
          {trending.map((article, i) => {
            const style = categoryStyle(article.category);
            const rank = i + 1;
            return (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className={`flex items-start gap-2.5 px-3 py-3 hover:bg-gray-50/60 transition-colors no-underline group animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
              >
                <span className={`shrink-0 w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold ${
                  rank <= 3 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {rank}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[14px] sm:text-[13px] font-bold text-gray-800 group-hover:text-primary-700 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={`text-[12px] sm:text-[11px] font-medium px-1.5 py-0.5 rounded ${style.badge}`}>
                      {article.category}
                    </span>
                    <span className="text-[12px] sm:text-[11px] text-gray-400">{article.sourceName}</span>
                    <span className="text-[12px] sm:text-[11px] text-gray-300">{article.publishedAt}</span>
                  </div>
                  {article.actionItems?.[0] && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <svg className="w-3 h-3 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[12px] sm:text-[11px] text-blue-600 leading-snug">
                        {article.actionItems[0]}
                      </span>
                    </div>
                  )}
                </div>
                <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary-400 transition-colors shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── カテゴリ ── */}
      <section className="mb-5 sm:mb-8 animate-fade-in-up stagger-2">
        <h2 className="text-[14px] sm:text-[13px] font-bold text-gray-700 mb-2.5">カテゴリ</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {categories.map((cat) => {
            const style = categoryStyle(cat);
            const count = articles.filter((a) => a.category === cat).length;
            return (
              <Link
                key={cat}
                to={`/articles?category=${encodeURIComponent(cat)}`}
                className={`${style.bg} rounded-lg p-2.5 border border-gray-200/60 card-hover no-underline group`}
              >
                <span className="text-base block mb-0.5">{style.icon}</span>
                <h3 className="text-[13px] sm:text-[13px] font-bold text-gray-800 group-hover:text-primary-700 transition-colors">
                  {cat}
                </h3>
                <p className="text-[12px] sm:text-[11px] text-gray-400 mt-0.5">{count}件</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 注目記事 ── */}
      <section className="mb-5 sm:mb-8 animate-fade-in-up stagger-3">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-[14px] sm:text-[13px] font-bold text-gray-700">注目記事</h2>
          <Link to="/articles" className="text-[12px] sm:text-[11px] text-primary-600 hover:text-primary-700 no-underline font-medium">
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {featuredArticles.map((article, i) => (
            <ArticleCard key={article.id} article={article} className={`animate-fade-in-up stagger-${Math.min(i + 1, 6)}`} />
          ))}
        </div>
      </section>

      {/* ── 最近の記事 ── */}
      <section className="mb-5 animate-fade-in-up stagger-4">
        <h2 className="text-[14px] sm:text-[13px] font-bold text-gray-700 mb-2.5">最近追加した記事</h2>
        <div className="bg-white rounded-lg border border-gray-200/80 divide-y divide-gray-100 overflow-hidden">
          {recentArticles.map((article, i) => {
            const style = categoryStyle(article.category);
            return (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className={`flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50/60 transition-colors no-underline group animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
              >
                <div className={`w-1 self-stretch rounded-full shrink-0 ${style.dot}`} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[14px] sm:text-[13px] font-bold text-gray-800 group-hover:text-primary-700 transition-colors truncate">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span className={`text-[12px] sm:text-[11px] font-medium px-1.5 py-0.5 rounded ${style.badge}`}>
                      {article.category}
                    </span>
                    <span className="text-[12px] sm:text-[11px] text-gray-400">{article.sourceName}</span>
                    <span className="text-[12px] sm:text-[11px] text-gray-300">{article.publishedAt}</span>
                  </div>
                </div>
                <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
