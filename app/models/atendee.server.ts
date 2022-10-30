import { prisma } from "~/db.server";
export type { Atendee } from "@prisma/client";

export function getAtendees() {
  return prisma.atendee.findMany();
}
