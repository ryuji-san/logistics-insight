import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { FontSizeProvider } from "./context/FontSizeContext";
import Header from "./components/Header";
import TopPage from "./pages/TopPage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <FontSizeProvider>
      <div className="min-h-screen bg-[#f8fafc]">
        <Header />
        <main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/articles" element={<ArticleListPage />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
          </Routes>
        </main>
        <footer className="border-t border-gray-100 bg-white/50">
          <div className="max-w-5xl mx-auto px-3 sm:px-6 py-3 text-center">
            <p className="text-[12px] text-gray-300">
              物流インサイト — 社内向け物流政策・業界動向レポート
            </p>
          </div>
        </footer>
      </div>
    </FontSizeProvider>
  );
}
