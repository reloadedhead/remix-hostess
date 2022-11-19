import type { Table } from "@prisma/client";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
import { getAtendee } from "./atendee.server";

export function getTables() {
  return prisma.table.findMany({ include: { atendees: true } });
}

export function getTableById(id: string) {
  return prisma.table.findUnique({
    where: { id },
    include: { atendees: true },
  });
}

export async function addAtendee(tableId: string, atendeeId: string) {
  const atendee = await getAtendee(atendeeId);

  invariant(atendee);

  return prisma.table.update({
    where: { id: tableId },
    data: { atendees: { connect: { id: atendee.id } } },
  });
}

export async function createTable(data: Pick<Table, "name" | "capacity">) {
  return prisma.table.create({ data });
}

export async function updateTable(
  id: string,
  data: Pick<Table, "name" | "capacity">
) {
  return prisma.table.update({ where: { id }, data });
}
