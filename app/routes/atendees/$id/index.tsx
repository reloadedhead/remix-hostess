import { json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import type { Atendee } from "@prisma/client";

import {
  createAtendee,
  getAtendee,
  updateAtendee,
} from "~/models/atendee.server";
import Card from "~/components/card";
import Main from "~/components/main";
import Button from "~/components/button";
import Input from "~/components/input";

type LoaderData = { atendee: Atendee | null };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, "Missing id");

  if (params.id === "new") return json({ atendee: null });

  const atendee = await getAtendee(params.id);
  invariant(atendee, "Atendee not found");

  return json<LoaderData>({ atendee });
};

type ActionData =
  | {
      name: null | string;
      email: null | string;
      phone: null | string;
    }
  | undefined;

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.id);

  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");

  const errors: ActionData = {
    name: !name ? "Full name is required" : null,
    email: !email ? "Email is required" : null,
    phone: !phone ? "Phone number is required" : null,
  };

  const hasErrors = Object.values(errors).some(Boolean);

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(
    typeof name === "string" && name.length > 0,
    "Name must be a string"
  );
  invariant(typeof email === "string", "Email must be a string");
  invariant(typeof phone === "string", "Phone must be a string");

  if (params.id === "new") {
    await createAtendee({ name, email, phone });
  } else {
    await updateAtendee(params.id, { name, email, phone });
  }

  return redirect("atendees");
};

export default function AtendeeSlug() {
  const { atendee } = useLoaderData<LoaderData>();
  const errors = useActionData<ActionData>();

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);
  return (
    <Main>
      <Form method="post">
        <Card
          title="Atendee information"
          action={
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Saving..." : "Save"}
            </Button>
          }
        >
          <div className="grid grid-cols-1 gap-2">
            <Input
              label="Full name"
              id="input-name"
              name="name"
              type="text"
              autoComplete="name"
              defaultValue={atendee?.name}
              error={errors?.name}
            />
            <Input
              label="Email"
              id="input-email"
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={atendee?.email}
              error={errors?.email}
            />

            <Input
              label="Phone number"
              id="input-phone-number"
              name="phone"
              type="tel"
              autoComplete="tel"
              defaultValue={atendee?.phone}
              error={errors?.phone}
            />
          </div>
        </Card>
      </Form>
    </Main>
  );
}
