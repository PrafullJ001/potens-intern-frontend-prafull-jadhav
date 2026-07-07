import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../hooks/useLanguage";

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <span className="font-semibold text-slate-900 tracking-tight">
          {t("appName")}
        </span>
        <LanguageToggle />
      </div>
    </header>
  );
}