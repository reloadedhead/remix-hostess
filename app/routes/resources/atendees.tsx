import { useFetcher } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { useId, useState } from "react";
import invariant from "tiny-invariant";
import { searchAtendees } from "~/models/atendee.server";
import { useCombobox } from "downshift";
import cn from "classnames";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const query = url.searchParams.get("query");

  invariant(query !== null, "A query is required");

  const atendees = await searchAtendees(query);

  return json({ atendees });
}

type Props = {
  error?: string | null;
};

/**
 * A full-stack component that allows selecting an atendee.
 */
export default function AtendeeSelector({ error }: Props) {
  const atendeeFetcher = useFetcher<typeof loader>();
  const id = useId();

  const atendees = atendeeFetcher.data?.atendees ?? [];

  type Atendee = typeof atendees[number];

  const showSpinner = atendeeFetcher.state !== "idle";

  const [selectedAtendee, setSelectedAtendee] = useState<
    Atendee | null | undefined
  >(null);

  const cb = useCombobox<Atendee>({
    id,
    onSelectedItemChange: ({ selectedItem }) =>
      setSelectedAtendee(selectedItem),
    items: atendees,
    itemToString: (atendee) => (atendee ? atendee.name : ""),
    onInputValueChange: ({ inputValue }) => {
      atendeeFetcher.submit(
        { query: inputValue ?? "" },
        { method: "get", action: "/resources/atendees" }
      );
    },
  });

  const displayMenu = cb.isOpen && atendees.length > 0;

  return (
    <div className="relative">
      <input name="atendeeId" type="hidden" value={selectedAtendee?.id ?? ""} />
      <div className="flex flex-wrap items-center gap-1 py-2">
        <label {...cb.getLabelProps()}>Atendee</label>
      </div>
      <div {...cb.getMenuProps({ className: "relative" })}>
        <input
          {...cb.getInputProps({
            className: cn(
              "rounded",
              "text-sm w-full dark:bg-slate-700 dark:highlight-white/10 dark:focus-within:bg-transparent border border-gray-500 px-2 py-1",
              "ring-1 ring-slate-200 shadow-sm focus:outline-none focus:ring-2 dark:text-slate-100 dark:placeholder:text-slate-500 dark:ring-0 dark:focus:ring-2",
              error
                ? "border-red-600 ring-red-600"
                : "focus:border-indigo-500 focus:ring-indigo-500"
            ),
            "aria-invalid": Boolean(error) || undefined,
            "aria-errormessage": error ? "customer-error" : undefined,
          })}
        />
        {error ? <em className="mt-2 text-sm text-red-600">{error}</em> : null}
        <Spinner showSpinner={showSpinner} />
      </div>
      <ul
        {...cb.getMenuProps({
          className: cn(
            "mt-2 pointer-events-auto absolute z-50 w-full rounded-md bg-white dark:bg-slate-700 leading-5 text-slate-700 shadow-xl shadow-black/5 ring-1 ring-slate-700/10",
            { hidden: !displayMenu }
          ),
        })}
      >
        {displayMenu
          ? atendees.map((atendee, index) => (
              <li
                className={cn(
                  "cursor-pointer rounded-md py-1 px-2 text-sm dark:text-white",
                  {
                    "bg-indigo-600": cb.highlightedIndex === index,
                  }
                )}
                key={atendee.id}
                {...cb.getItemProps({ item: atendee, index })}
              >
                {atendee.name}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

function Spinner({ showSpinner }: { showSpinner: boolean }) {
  return (
    <div
      className={`absolute right-0 top-[6px] transition-opacity ${
        showSpinner ? "opacity-100" : "opacity-0"
      }`}
    >
      <svg
        className="-ml-1 mr-3 h-5 w-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
      >
        <circle
          className="opacity-25"
          cx={12}
          cy={12}
          r={10}
          stroke="currentColor"
          strokeWidth={4}
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}
