import { ActionArgs, json, redirect } from "@remix-run/server-runtime";
import type { LoaderArgs } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { createTable, getTableById, updateTable } from "~/models/tables.server";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import Button from "~/components/button";
import Card from "~/components/card";
import Input from "~/components/input";
import AtendeeSelector from "~/routes/resources/atendees";

export async function loader({ params }: LoaderArgs) {
  const tableId = params.id;

  if (tableId === "new") return json({ table: null });

  invariant(tableId);

  const table = await getTableById(tableId);

  invariant(table);

  return json({ table });
}

export async function action({ request, params }: ActionArgs) {
  invariant(params.id);

  const formData = await request.formData();

  const name = formData.get("name");
  const capacity = formData.get("capacity");

  const errors = {
    name: !name ? "Name is required" : null,
    capacity: !capacity ? "Capacity is required" : null,
  };

  const hasErrors = Object.values(errors).some(Boolean);

  if (hasErrors) {
    return json(errors);
  }

  invariant(typeof name === "string", "Name should be a string.");
  invariant(
    typeof name === "string" && !isNaN(Number(capacity)),
    "Capacity should be a number."
  );

  if (params.id === "new") {
    await createTable({ name, capacity: Number(capacity) });
  } else {
    console.log(params.id, name, capacity);
    await updateTable(params.id, { name, capacity: Number(capacity) });
  }

  return redirect("tables");
}

export default function Table() {
  const { table } = useLoaderData<typeof loader>();

  const errors = useActionData<typeof action>();
  const transition = useTransition();
  const isSubmitting = Boolean(transition.submission);

  const isNew = table === null;

  return (
    <Form method="post">
      <Card
        title={isNew ? "New table" : table.name}
        action={
          <Button type="submit">{isSubmitting ? "Saving..." : "Save"}</Button>
        }
      >
        <div className="grid grid-cols-1 gap-2">
          <Input
            name="name"
            type="text"
            label="Name"
            required
            defaultValue={table?.name}
            error={errors?.name}
          />
          <Input
            name="capacity"
            type="number"
            label="Capacity"
            required
            min={isNew ? 1 : table.capacity - table.atendees.length}
            max={15}
            defaultValue={table?.capacity}
            error={errors?.capacity}
          />
        </div>
      </Card>
    </Form>
  );
}
