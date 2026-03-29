export interface Article {
  id: string;
  title: string;
  category: string;
  publishedAt: string;
  sourceName: string;
  sourceUrl: string;
  summary: string;
  implication: string;
  tags: string[];
  featured: boolean;
  relatedThemes: string[];
  importance?: number; // 1-100 重要度スコア
  actionItems?: string[]; // 具体的アクション
}
