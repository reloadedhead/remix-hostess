import { ReactNode } from "react";

/**
 * Render a layout surface with nice styles, courtesy from Tailwind.
 */
export default function Card({
  children,
  title,
  action,
}: {
  children: ReactNode;
  title?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      {title && (
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      )}
      <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {children}
      </div>
    </div>
  );
}
