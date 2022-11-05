import { redirect } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { ActionFunction } from "@remix-run/node";
import { deleteAtendee } from "~/models/atendee.server";
import { TrashIcon } from "@heroicons/react/24/outline";

export const action: ActionFunction = async ({ params }) => {
  invariant(params.id);

  await deleteAtendee(params.id);

  return redirect(`atendees`);
};

type Props = {
  id: string;
};

export default function DeleteAtendee({ id }: Props) {
  const transition = useTransition();
  const isCheckingIn = Boolean(transition.submission);

  return (
    <Form method="post" action={`${id}/delete`}>
      <button title="Delete" type="submit" disabled={isCheckingIn}>
        <TrashIcon className="h-5 w-5 dark:stroke-slate-100" />
      </button>
    </Form>
  );
}
