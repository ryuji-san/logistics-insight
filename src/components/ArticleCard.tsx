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
      className={`block bg-white rounded-lg border border-gray-200/80 border-l-[3px] ${style.border} card-hover no-underline group ${className}`}
    >
      <div className="p-3.5 sm:p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded ${style.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {article.category}
          </span>
          {article.featured && (
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 ring-1 ring-amber-200/50">
              注目
            </span>
          )}
        </div>

        <h3 className="text-[13px] sm:text-[14px] font-bold text-gray-800 group-hover:text-primary-700 transition-colors mb-1.5 leading-snug">
          {article.title}
        </h3>

        <p className="text-[12px] sm:text-[13px] text-gray-500 line-clamp-3 leading-relaxed mb-2.5">
          {article.summary}
        </p>

        <div className="flex items-center justify-between text-[11px] text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${style.dot}`}>
              {article.sourceName.charAt(0)}
            </span>
            {article.sourceName}
          </span>
          <span>{article.publishedAt}</span>
        </div>
      </div>
    </Link>
  );
}
