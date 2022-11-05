import type { HTMLProps, ReactNode } from "react";
import cn from "classnames";

type Variant = "primary" | "secondary";

type Props = HTMLProps<HTMLButtonElement> & {
  startIcon?: ReactNode;
  variant?: Variant;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-indigo-600 hover:bg-indigo-500 focus:ring-2 focus:ring-violet-400",
  secondary:
    "bg-slate-900 hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600",
};

export default function Button({
  disabled,
  startIcon,
  children,
  variant = "primary",
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cn(
        "rounded-md py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white focus:outline-none",
        disabled ? "cursor-not-allowed opacity-50" : null,
        variantClasses[variant]
      )}
    >
      <div className="flex space-x-2">
        {startIcon}
        <span>{children}</span>
      </div>
    </button>
  );
}
