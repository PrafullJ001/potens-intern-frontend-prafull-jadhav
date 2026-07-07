import { useLanguage } from "../hooks/useLanguage";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
  <button
  onClick={toggleLang}
  aria-label="Toggle language"
  className="relative flex items-center bg-slate-100 rounded-full p-1 w-[170px] h-10 text-sm font-medium"
>
  <span
    className="absolute top-1 bottom-1 left-1 w-[80px] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out"
    style={{
      transform: lang === "en" ? "translateX(0px)" : "translateX(80px)",
    }}
  />

  <span
    className={`relative z-10 w-1/2 text-center transition-colors ${
      lang === "en" ? "text-slate-900 font-semibold" : "text-slate-500"
    }`}
  >
    English
  </span>

  <span
    className={`relative z-10 w-1/2 text-center transition-colors ${
      lang === "mr" ? "text-slate-900 font-semibold" : "text-slate-500"
    }`}
  >
    मराठी
  </span>
</button>
  );
}