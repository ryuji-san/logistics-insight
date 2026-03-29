import { Link } from "react-router-dom";
import { articles, categories } from "../data/articles";
import ArticleCard from "../components/ArticleCard";
import { categoryStyle } from "../utils/category";

export default function TopPage() {
  const featuredArticles = articles.filter((a) => a.featured);
  const recentArticles = [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 5);

  const today = new Date();
  const greeting =
    today.getHours() < 12
      ? "おはようございます"
      : today.getHours() < 18
        ? "お疲れさまです"
        : "お疲れさまです";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Greeting + Hero */}
      <section className="mb-8 animate-fade-in-up">
        <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-6 sm:p-8 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative">
            <p className="text-primary-200 text-[13px] font-medium mb-1">
              {greeting}
            </p>
            <h1 className="text-xl sm:text-2xl font-bold mb-2 tracking-tight">
              物流インサイト
            </h1>
            <p className="text-primary-100 text-[13px] sm:text-sm leading-relaxed max-w-lg">
              物流政策・業界動向の要点と示唆をまとめて共有。
              現場の高度化・DX検討にお役立てください。
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                to="/articles"
                className="inline-flex items-center gap-1.5 bg-white text-primary-700 font-semibold text-[13px] px-4 py-2 rounded-lg hover:bg-primary-50 transition-all no-underline shadow-sm"
              >
                記事一覧を見る
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <div className="flex items-center gap-1.5 text-primary-200 text-[12px]">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {articles.length}件の記事を収録
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mb-8 animate-fade-in-up stagger-1">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "収録記事", value: `${articles.length}`, unit: "件" },
            { label: "カテゴリ", value: `${categories.length}`, unit: "分野" },
            { label: "注目記事", value: `${featuredArticles.length}`, unit: "件" },
            { label: "最終確認", value: `${today.getMonth() + 1}/${today.getDate()}`, unit: "" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-100 px-4 py-3 text-center"
            >
              <p className="text-[11px] text-gray-400 font-medium mb-0.5">
                {stat.label}
              </p>
              <p className="text-lg font-bold text-gray-800">
                {stat.value}
                <span className="text-[11px] text-gray-400 font-medium ml-0.5">
                  {stat.unit}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="mb-8 animate-fade-in-up stagger-2">
        <h2 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3">
          カテゴリ
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {categories.map((cat) => {
            const style = categoryStyle(cat);
            const count = articles.filter((a) => a.category === cat).length;
            return (
              <Link
                key={cat}
                to={`/articles?category=${encodeURIComponent(cat)}`}
                className={`${style.bg} rounded-xl p-3.5 border border-gray-100 card-hover no-underline group`}
              >
                <span className="text-xl mb-1.5 block">{style.icon}</span>
                <h3 className="text-[13px] font-bold text-gray-800 group-hover:text-primary-700 transition-colors">
                  {cat}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {count}件
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="mb-8 animate-fade-in-up stagger-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
            注目記事
          </h2>
          <Link
            to="/articles"
            className="text-[12px] text-primary-500 hover:text-primary-700 no-underline font-medium transition-colors"
          >
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {featuredArticles.slice(0, 3).map((article, i) => (
            <ArticleCard
              key={article.id}
              article={article}
              className={`animate-fade-in-up stagger-${i + 1}`}
            />
          ))}
        </div>
        {featuredArticles.length > 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {featuredArticles.slice(3).map((article, i) => (
              <ArticleCard
                key={article.id}
                article={article}
                className={`animate-fade-in-up stagger-${i + 4}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Recent Feed */}
      <section className="mb-8 animate-fade-in-up stagger-4">
        <h2 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3">
          最近追加した記事
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
          {recentArticles.map((article, i) => {
            const style = categoryStyle(article.category);
            return (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className={`flex items-center gap-3.5 px-4 py-3.5 hover:bg-gray-50/80 transition-colors no-underline group animate-fade-in-up stagger-${i + 1}`}
              >
                <div
                  className={`w-1 self-stretch rounded-full shrink-0 ${style.dot.replace("bg-", "bg-")}`}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[13px] font-bold text-gray-800 group-hover:text-primary-700 transition-colors truncate">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${style.badge}`}
                    >
                      {article.category}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {article.sourceName}
                    </span>
                    <span className="text-[11px] text-gray-300">
                      {article.publishedAt}
                    </span>
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-primary-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
