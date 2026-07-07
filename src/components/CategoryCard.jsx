import { cx } from "../utils/helpers";

export default function CategoryCard({ label, Icon, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl border transition-all duration-150 active:scale-[0.97] text-center",
        selected
          ? "border-slate-900 bg-slate-900 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      )}
    >
      <Icon
        size={22}
        strokeWidth={1.75}
        className={selected ? "text-white" : "text-slate-500"}
      />
      <span className="text-[13px] font-medium leading-tight">{label}</span>
    </button>
  );
}