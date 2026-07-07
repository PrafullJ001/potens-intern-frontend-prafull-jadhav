import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProgressStepper from "../components/ProgressStepper";
import CategoryCard from "../components/CategoryCard";
import Button from "../components/Button";
import { categories } from "../data/categories";
import { useLanguage } from "../hooks/useLanguage";
import { storageService } from "../services/storageService";

export default function CategoryPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(() => {
    const draft = storageService.getDraft();
    return draft?.category || null;
  });

  function handleNext() {
    if (!selected) return;
    const draft = storageService.getDraft() || {};
    storageService.saveDraft({ ...draft, category: selected });
    navigate("/details");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <ProgressStepper currentStep="category" />

      <main className="flex-1 max-w-md w-full mx-auto px-4 pt-2 pb-28">
        <h1 className="text-xl font-semibold text-slate-900 mb-1">
          {t("category.title")}
        </h1>
        <p className="text-sm text-slate-500 mb-6">{t("category.subtitle")}</p>

        <div className="grid grid-cols-2 gap-3">
          {categories.map(({ id, icon: Icon }) => (
            <CategoryCard
              key={id}
              label={t(`categories.${id}`)}
              Icon={Icon}
              selected={selected === id}
              onClick={() => setSelected(id)}
            />
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 p-4">
        <div className="max-w-md mx-auto">
          <Button onClick={handleNext} disabled={!selected}>
            {t("common.next")}
          </Button>
        </div>
      </div>
    </div>
  );
}