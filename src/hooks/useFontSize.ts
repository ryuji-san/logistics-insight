import { useState, useEffect } from "react";

export type FontSize = "small" | "medium" | "large";

const STORAGE_KEY = "logistics-insight-font-size";

export function useFontSize() {
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "small" || saved === "medium" || saved === "large")
        return saved;
    } catch {
      /* ignore */
    }
    return "medium";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, fontSize);
    const html = document.documentElement;
    html.classList.remove("text-size-small", "text-size-medium", "text-size-large");
    html.classList.add(`text-size-${fontSize}`);
  }, [fontSize]);

  return { fontSize, setFontSize };
}
