import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
import { getAtendee } from "./atendee.server";

export function getTables() {
  return prisma.table.findMany({ include: { atendees: true } });
}

export async function addAtendee(tableId: string, atendeeId: string) {
  const atendee = await getAtendee(atendeeId);

  invariant(atendee);

  return prisma.table.update({
    where: { id: tableId },
    data: { atendees: { connect: { id: atendee.id } } },
  });
}
