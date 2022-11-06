import type { ReactNode } from "react";

const Actions = ({ children }: { children: ReactNode }) => (
  <div className="flex justify-end space-x-2 bg-gray-50 px-4 py-3 dark:border-t dark:border-slate-900 dark:bg-slate-800 dark:text-slate-400 sm:px-6">
    {children}
  </div>
);

export default Actions;
