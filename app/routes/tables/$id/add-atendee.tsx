import { json, redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { useActionData, useNavigate, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";

import Button from "~/components/button";
import Modal from "~/components/modal";
import { addAtendee } from "~/models/tables.server";
import AtendeeSelector from "~/routes/resources/atendees";
import { useEffect, useState } from "react";

type ActionData =
  | {
      atendeeId: string | null;
    }
  | undefined;

export async function action({ params, request }: ActionArgs) {
  invariant(params.id);

  const formData = await request.formData();

  const atendeeId = formData.get("atendeeId");

  const errors: ActionData = {
    atendeeId: !atendeeId ? "Atendee is required" : null,
  };
  const hasErrors = Object.values(errors).some(Boolean);

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(typeof atendeeId === "string", "Atendee is required");

  addAtendee(params.id, atendeeId);

  return redirect("tables");
}

export default function AddAtendeeModal() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const errors = useActionData<ActionData>();
  const transition = useTransition();

  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  useEffect(() => {
    setOpen(true);
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <Modal
      open={open}
      form
      method="post"
      replace
      onClose={handleClose}
      title="Add atendee"
    >
      <Modal.Body>
        <AtendeeSelector error={errors?.atendeeId} />
      </Modal.Body>
      <Modal.Actions>
        <Button disabled={disabled} variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button disabled={disabled} type="submit">
          {transition.state === "submitting" ? "Saving..." : "Save"}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
