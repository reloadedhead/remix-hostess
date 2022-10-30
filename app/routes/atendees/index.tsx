import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getAtendees } from "~/models/atendee.server";
import Card from "~/components/card";

type LoaderData = {
  atendees: Awaited<ReturnType<typeof getAtendees>>;
};

export const loader = async () => {
  return json<LoaderData>({ atendees: await getAtendees() });
};

export default function AtendeesIndex() {
  const { atendees } = useLoaderData<LoaderData>();
  return (
    <Card>
      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr>
            <th className="border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
              Name
            </th>
            <th className="border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
              Email
            </th>
            <th className="border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
              Phone number
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          {atendees.map((atendee) => (
            <tr key={`row-${atendee.id}`}>
              <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                {atendee.name}
              </td>
              <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <a href={`mailto:${atendee.email}`}>{atendee.email}</a>
              </td>
              <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <a href={`tel:${atendee.phone}`}>{atendee.phone}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
