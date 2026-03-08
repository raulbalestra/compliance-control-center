import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { translations, Locale, Translations } from "./translations";

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem("ica-locale");
    return (saved === "pt-BR" ? "pt-BR" : "en") as Locale;
  });

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "en" ? "pt-BR" : "en";
      localStorage.setItem("ica-locale", next);
      return next;
    });
  }, []);

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
