import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";

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

  return (
    <Main>
      <div className="grid grid-flow-col gap-2">
        <Card title="Tables" action={<Link to="new">New</Link>}>
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
                        {table.atendees.length > 0 ? (
                          <>
                            <span>{table.atendees[0].name}</span>{" "}
                            {table.atendees.length > 1 && (
                              <span
                                title={table.atendees
                                  .slice(1)
                                  .map((a) => a.name)
                                  .join(", ")}
                                className="text-xs text-gray-400"
                              >{`+${table.atendees.length - 1}`}</span>
                            )}
                          </>
                        ) : (
                          <span>-</span>
                        )}
                      </td>

                      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        <div className="flex space-x-2">
                          <Link to={table.id}>
                            <PencilIcon
                              title="Edit table"
                              className="h-5 w-5 dark:stroke-slate-100"
                            />
                          </Link>
                          <Link to={isFull ? "" : `${table.id}/add-atendee`}>
                            <PlusIcon
                              title={isFull ? "Table is full" : "Add atendee"}
                              className="h-5 w-5 dark:stroke-slate-100"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
        <Outlet />
      </div>
    </Main>
  );
}
