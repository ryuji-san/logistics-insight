import { createContext, useContext, type ReactNode } from "react";
import { useFontSize, type FontSize } from "../hooks/useFontSize";

interface FontSizeContextValue {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextValue>({
  fontSize: "medium",
  setFontSize: () => {},
});

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const value = useFontSize();
  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSizeContext() {
  return useContext(FontSizeContext);
}
