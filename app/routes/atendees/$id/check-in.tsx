import { redirect } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { ActionFunction } from "@remix-run/node";
import { checkIn } from "~/models/atendee.server";
import Button from "~/components/button";

export const action: ActionFunction = async ({ params }) => {
  invariant(params.id);

  await checkIn(params.id, new Date());

  return redirect(`atendees`);
};

type Props = {
  id: string;
};

export default function CheckIn({ id }: Props) {
  const transition = useTransition();
  const isCheckingIn = Boolean(transition.submission);

  return (
    <Form method="post" action={`/atendees/${id}/check-in`}>
      <Button type="submit" disabled={isCheckingIn}>
        {isCheckingIn ? "Checking in..." : "Check in now"}
      </Button>
    </Form>
  );
}
