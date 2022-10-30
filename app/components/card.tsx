import { ReactNode } from "react";

/**
 * Render a layout surface with nice styles, courtesy from Tailwind.
 */
export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="prose prose-slate dark:prose-dark relative z-20 mx-28 mt-12">
      <div className="not-prose relative mt-4 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/25">
        <div className="bg-grid-slate-100 dark:bg-grid-slate-700/25 absolute inset-0 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        <div className="relative overflow-auto rounded-xl">
          <div className="my-8 overflow-hidden shadow-sm">{children}</div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-xl border border-black/5 dark:border-white/5" />
    </div>
  );
}
