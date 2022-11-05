import { prisma } from "~/db.server";
import type { Atendee } from "@prisma/client";
export type { Atendee } from "@prisma/client";

export function getAtendees() {
  return prisma.atendee.findMany();
}

export function getAtendee(id: string) {
  return prisma.atendee.findUnique({ where: { id } });
}

export function updateAtendee(
  id: string,
  data: Pick<Atendee, "name" | "phone" | "email">
) {
  return prisma.atendee.update({ where: { id }, data });
}

export function createAtendee(data: Pick<Atendee, "name" | "phone" | "email">) {
  return prisma.atendee.create({ data });
}

export function checkIn(id: string, checkedInAt: Date) {
  return prisma.atendee.update({ where: { id }, data: { checkedInAt } });
}

export function deleteAtendee(id: string) {
  return prisma.atendee.delete({ where: { id } });
}
