import { createContext, useState, useCallback, useMemo } from "react";
import { translations } from "../data/translations";
import { STORAGE_KEYS } from "../utils/constants";

export const LanguageContext = createContext(null);

function getNested(obj, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem(STORAGE_KEYS.LANGUAGE) || "en"
  );

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "mr" : "en";
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key) => getNested(translations[lang], key) ?? key,
    [lang]
  );

  const value = useMemo(() => ({ lang, toggleLang, t }), [lang, toggleLang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}