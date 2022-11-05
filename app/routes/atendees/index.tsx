import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { EyeIcon, ShareIcon } from "@heroicons/react/24/outline";
import vCard from "vcards-js";

import { getAtendees } from "~/models/atendee.server";
import type { Atendee } from "~/models/atendee.server";
import Card from "~/components/card";
import Main from "~/components/main";
import CheckIn from "./$id/check-in";

type LoaderData = {
  atendees: Awaited<ReturnType<typeof getAtendees>>;
};

export const loader = async () => {
  return json<LoaderData>({ atendees: await getAtendees() });
};

export default function AtendeesIndex() {
  const { atendees } = useLoaderData<LoaderData>();

  const shareAtendee =
    (
      atendee: Omit<Atendee, "createdAt" | "updatedAt" | "id" | "checkedInAt">
    ) =>
    async () => {
      try {
        if (navigator) {
          const card = vCard();
          card.formattedName = atendee.name;
          card.email = atendee.email;
          card.cellPhone = atendee.phone;

          await navigator.share({
            files: [
              new File(
                [new Blob([card.getFormattedString()])],
                `${atendee.name}.vcf`
              ),
            ],
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <Main>
      <Card title="Atendees" action={<Link to="new">New</Link>}>
        <div className="overflow-auto">
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
                <th className="border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                  Has checked in?
                </th>
                <th className="border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200"></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
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
                  <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    {atendee.checkedInAt ? "Yes" : <CheckIn id={atendee.id} />}
                  </td>
                  <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    <div className="flex space-x-2">
                      <Link to={atendee.id}>
                        <EyeIcon className="h-5 w-5 dark:stroke-slate-100" />
                      </Link>
                      <button
                        aria-label="share"
                        type="button"
                        onClick={shareAtendee(atendee)}
                      >
                        <ShareIcon className="h-5 w-5 dark:stroke-slate-100" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Main>
  );
}
