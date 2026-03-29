import { Routes, Route } from "react-router-dom";
import { FontSizeProvider } from "./context/FontSizeContext";
import Header from "./components/Header";
import TopPage from "./pages/TopPage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";

export default function App() {
  return (
    <FontSizeProvider>
      <div className="min-h-screen bg-[#f8fafc]">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/articles" element={<ArticleListPage />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
          </Routes>
        </main>
        <footer className="border-t border-gray-100 bg-white/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 text-center">
            <p className="text-[11px] text-gray-300">
              物流インサイト — 社内向け物流政策・業界動向レポート
            </p>
          </div>
        </footer>
      </div>
    </FontSizeProvider>
  );
}
