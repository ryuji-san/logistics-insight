import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useFontSizeContext } from "../context/FontSizeContext";
import type { FontSize } from "../hooks/useFontSize";

const sizeOptions: { value: FontSize; label: string }[] = [
  { value: "small", label: "小" },
  { value: "medium", label: "標準" },
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
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-11 sm:h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 no-underline">
            <div className="w-6 h-6 bg-primary-600 rounded-md flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900">
              物流インサイト
            </span>
          </Link>

          <div className="flex items-center gap-0">
            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-0.5 mr-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-2.5 py-1 rounded-md text-sm font-medium no-underline transition-colors ${
                    isActive(item.to)
                      ? "text-primary-700 bg-primary-50"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Font size */}
            <div className="relative">
              <button
                onClick={() => setSizeMenuOpen(!sizeMenuOpen)}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="文字サイズ変更"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h10M3 17h18" />
                </svg>
              </button>
              {sizeMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSizeMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg border border-gray-200 shadow-lg py-1 animate-fade-in min-w-[100px]">
                    <p className="text-[12px] sm:text-[11px] text-gray-400 font-medium px-3 pt-0.5 pb-1">文字サイズ</p>
                    {sizeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setFontSize(opt.value); setSizeMenuOpen(false); }}
                        className={`w-full text-left px-3 py-1.5 text-sm font-medium transition-colors flex items-center justify-between ${
                          fontSize === opt.value
                            ? "bg-primary-50 text-primary-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {fontSize === opt.value && (
                          <svg className="w-3.5 h-3.5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="sm:hidden p-1.5 -mr-1 rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニュー"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <nav className="sm:hidden pb-2 animate-fade-in border-t border-gray-100 pt-1.5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium no-underline ${
                  isActive(item.to)
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-500 hover:bg-gray-50"
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
