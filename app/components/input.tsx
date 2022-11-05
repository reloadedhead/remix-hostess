import type { HTMLProps, ReactNode } from "react";
import cn from "classnames";

type Props = {
  label: ReactNode;
  adornment?: ReactNode;
  error?: string | null;
} & HTMLProps<HTMLInputElement>;

export default function Input({ label, adornment, error, ...rest }: Props) {
  return (
    <div>
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <div className="rounded-md shadow-sm">
          {adornment ? (
            <div className="pointer-events-none absolute inset-y-0 left-0 mr-3 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
          ) : null}
          <input
            className={cn(
              "block w-full rounded-md border-gray-300 sm:text-sm",
              error
                ? "border-red-600 ring-red-600"
                : "focus:border-indigo-500 focus:ring-indigo-500"
            )}
            {...rest}
          />
        </div>
        {error ? <em className="text-sm text-red-600">{error}</em> : null}
      </div>
    </div>
  );
}
