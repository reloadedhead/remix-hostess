import type { HTMLProps, ReactNode } from "react";

type Props = HTMLProps<HTMLButtonElement> & {
  startIcon?: ReactNode;
};

export default function Button(props: Props) {
  return (
    <button
      {...props}
      className="rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
    >
      <div className="flex space-x-2">
        {props.startIcon}
        <span>{props.children}</span>
      </div>
    </button>
  );
}
