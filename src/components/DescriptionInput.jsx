import { useLanguage } from "../hooks/useLanguage";
import { MAX_DESCRIPTION_LENGTH } from "../utils/constants";

export default function DescriptionInput({ value, onChange }) {
  const { t } = useLanguage();

  return (
    <div>
      <label
        htmlFor="description"
        className="block text-sm font-medium text-slate-700 mb-1.5"
      >
        {t("details.descriptionLabel")}
      </label>
      <textarea
        id="description"
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))}
        placeholder={t("details.descriptionPlaceholder")}
        rows={5}
        className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none transition-shadow"
      />
      <div className="flex justify-end mt-1">
        <span className="text-xs text-slate-400">
          {value.length}/{MAX_DESCRIPTION_LENGTH} {t("details.charCount")}
        </span>
      </div>
    </div>
  );
}