import type { HTMLProps, ReactNode } from "react";
import cn from "classnames";

type Props = HTMLProps<HTMLButtonElement> & {
  startIcon?: ReactNode;
};

export default function Button({
  disabled,
  startIcon,
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cn(
        "rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500",
        disabled ? "cursor-not-allowed opacity-50" : null
      )}
    >
      <div className="flex space-x-2">
        {startIcon}
        <span>{children}</span>
      </div>
    </button>
  );
}
