import { PlusCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import cn from "classnames";

import Card from "~/components/card";
import Main from "~/components/main";
import { getTables } from "~/models/tables.server";

type LoaderData = {
  tables: Awaited<ReturnType<typeof getTables>>;
};

export const loader = async () =>
  json<LoaderData>({ tables: await getTables() });

export default function Tables() {
  const { tables } = useLoaderData<LoaderData>();
  const navigate = useNavigate();

  const handleAddAtendee = (tableId: string) => () =>
    navigate(`${tableId}/add-atendee`);
  return (
    <Main>
      <Card title="Tables">
        <div className="overflow-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                  Name
                </th>
                <th className="border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                  Availability
                </th>
                <th className="border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                  Atendees
                </th>
                <th className="border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200"></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {tables.map((table) => {
                const isFull = table.atendees.length === table.capacity;

                return (
                  <tr key={`row-${table.id}`}>
                    <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                      {table.name}
                    </td>
                    <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                      {table.capacity - table.atendees.length} seats available
                    </td>

                    <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                      <div className="flex space-x-2">
                        <ul className="list-disc">
                          {table.atendees.map((atendee) => (
                            <li key={`UserItem-${atendee.id}`}>
                              <Link to={`/atendees/${atendee.id}`}>
                                {atendee.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>

                    <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                      <div className="flex space-x-2">
                        <button
                          disabled={isFull}
                          type="button"
                          title="Table is full"
                          onClick={handleAddAtendee(table.id)}
                        >
                          <PlusCircleIcon
                            className={cn(
                              "h-5",
                              "w-5",
                              isFull
                                ? "dark:stroke-slate-400"
                                : "dark:stroke-slate-100"
                            )}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Outlet />
      </Card>
    </Main>
  );
}
