import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { articles, categories } from "../data/articles";
import ArticleCard from "../components/ArticleCard";

export default function ArticleListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filtered = useMemo(() => {
    return articles
      .filter((a) => {
        const matchesCategory =
          !selectedCategory || a.category === selectedCategory;
        const q = search.toLowerCase();
        const matchesSearch =
          !q ||
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.implication.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.sourceName.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [search, selectedCategory]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-6 animate-fade-in">
        <h1 className="text-lg font-bold text-gray-900 mb-1">記事一覧</h1>
        <p className="text-[12px] text-gray-400">
          物流政策・業界動向の要点と示唆を整理しています
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 space-y-3 animate-fade-in-up stagger-1">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="キーワードで検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[13px] border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => handleCategoryChange("")}
            className={`px-3 py-1.5 text-[12px] rounded-lg border font-medium transition-all ${
              !selectedCategory
                ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            すべて
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 text-[12px] rounded-lg border font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-3xl mb-3">🔍</div>
          <p className="text-[13px] text-gray-400">
            該当する記事が見つかりません
          </p>
          <button
            onClick={() => {
              setSearch("");
              handleCategoryChange("");
            }}
            className="text-[12px] text-primary-500 hover:text-primary-700 mt-2 font-medium"
          >
            フィルターをリセット
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((article, i) => (
            <ArticleCard
              key={article.id}
              article={article}
              className={`animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
            />
          ))}
        </div>
      )}

      <p className="text-[11px] text-gray-300 mt-6">
        {filtered.length}件の記事を表示中
      </p>
    </div>
  );
}
