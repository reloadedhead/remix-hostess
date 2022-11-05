import type { ReactNode } from "react";

const Body = ({ children }: { children: ReactNode }) => (
  <div className="mt-2 overflow-auto text-sm text-gray-500">{children}</div>
);

export default Body;
