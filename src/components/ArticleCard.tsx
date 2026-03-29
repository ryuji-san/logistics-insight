import { Link } from "react-router-dom";
import type { Article } from "../types";
import { categoryStyle } from "../utils/category";

interface Props {
  article: Article;
  className?: string;
}

export default function ArticleCard({ article, className = "" }: Props) {
  const style = categoryStyle(article.category);

  return (
    <Link
      to={`/articles/${article.id}`}
      className={`block bg-white rounded-2xl border border-gray-100 card-hover no-underline group ${className}`}
    >
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-md ${style.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {article.category}
          </span>
          {article.featured && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-600">
              注目
            </span>
          )}
        </div>

        <h3 className="text-[15px] font-bold text-gray-800 group-hover:text-primary-700 transition-colors mb-2.5 leading-relaxed">
          {article.title}
        </h3>

        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-3">
          {article.summary}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">
            {article.sourceName}
          </span>
          <span className="text-xs text-gray-300">
            {article.publishedAt}
          </span>
        </div>
      </div>
    </Link>
  );
}
