import { useLanguage } from "../hooks/useLanguage";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      aria-label="Toggle language"
      className="relative flex items-center bg-slate-100 rounded-full p-1 w-[88px] h-9 text-xs font-medium"
    >
      <span
        className="absolute top-1 bottom-1 w-[42px] bg-white rounded-full shadow-sm transition-transform duration-200 ease-out"
        style={{ transform: lang === "en" ? "translateX(0px)" : "translateX(42px)" }}
      />
      <span
        className={`relative z-10 w-1/2 text-center transition-colors ${
          lang === "en" ? "text-slate-900" : "text-slate-400"
        }`}
      >
        EN
      </span>
      <span
        className={`relative z-10 w-1/2 text-center transition-colors ${
          lang === "mr" ? "text-slate-900" : "text-slate-400"
        }`}
      >
        मर
      </span>
    </button>
  );
}