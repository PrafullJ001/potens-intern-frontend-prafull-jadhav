import { useLanguage } from "../hooks/useLanguage";
import { cx } from "../utils/helpers";

const STEP_KEYS = ["category", "details", "confirmation"];

export default function ProgressStepper({ currentStep }) {
  const { t } = useLanguage();
  const currentIndex = STEP_KEYS.indexOf(currentStep);

  return (
    <div className="max-w-md mx-auto px-4 pt-4 pb-2">
      <div className="flex items-center">
        {STEP_KEYS.map((key, i) => (
          <div key={key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cx(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-300",
                  i < currentIndex && "bg-slate-900 text-white",
                  i === currentIndex && "bg-slate-900 text-white ring-4 ring-slate-100",
                  i > currentIndex && "bg-slate-100 text-slate-400"
                )}
              >
                {i < currentIndex ? "✓" : i + 1}
              </div>
              <span
                className={cx(
                  "text-[11px] whitespace-nowrap",
                  i === currentIndex ? "text-slate-900 font-medium" : "text-slate-400"
                )}
              >
                {t(`steps.${key}`)}
              </span>
            </div>
            {i < STEP_KEYS.length - 1 && (
              <div
                className={cx(
                  "h-px flex-1 mx-2 mb-4 transition-colors duration-300",
                  i < currentIndex ? "bg-slate-900" : "bg-slate-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}