import { cx } from "../utils/helpers";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "w-full py-3.5 px-4 rounded-xl font-medium text-base transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900",
    secondary:
      "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 focus:ring-slate-300",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
  };

  return (
    <button className={cx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}