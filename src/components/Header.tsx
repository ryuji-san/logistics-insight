import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useFontSizeContext } from "../context/FontSizeContext";
import type { FontSize } from "../hooks/useFontSize";

const sizeOptions: { value: FontSize; label: string }[] = [
  { value: "small", label: "小" },
  { value: "medium", label: "中" },
  { value: "large", label: "大" },
];

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sizeMenuOpen, setSizeMenuOpen] = useState(false);
  const { fontSize, setFontSize } = useFontSizeContext();

  const navItems = [
    { to: "/", label: "ホーム" },
    { to: "/articles", label: "記事一覧" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-bold text-gray-900 tracking-tight">
                物流インサイト
              </span>
              <span className="text-[10px] text-gray-400 font-medium hidden sm:inline">
                Logistics Insight
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-0.5 mr-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-3.5 py-1.5 rounded-lg text-[13px] font-medium no-underline transition-all duration-200 ${
                    isActive(item.to)
                      ? "text-primary-700 bg-primary-50"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Font size button */}
            <div className="relative">
              <button
                onClick={() => setSizeMenuOpen(!sizeMenuOpen)}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                title="文字サイズ"
              >
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </button>

              {sizeMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setSizeMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-xl border border-gray-100 shadow-lg p-1.5 animate-fade-in min-w-[120px]">
                    <p className="text-[10px] text-gray-400 font-medium px-2.5 py-1">
                      文字サイズ
                    </p>
                    {sizeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setFontSize(opt.value);
                          setSizeMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-between ${
                          fontSize === opt.value
                            ? "bg-primary-50 text-primary-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {fontSize === opt.value && (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="sm:hidden p-2 -mr-2 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="sm:hidden pb-3 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-[13px] font-medium no-underline transition-colors ${
                  isActive(item.to)
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
