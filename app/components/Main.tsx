import type { HTMLProps } from "react";

export default function Main({ children, ...rest }: HTMLProps<HTMLElement>) {
  return (
    <main {...rest} className="mx-auto my-6 max-w-4xl px-4">
      {children}
    </main>
  );
}
