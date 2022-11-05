import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const atendees = [
    {
      name: "John Doe",
      email: "jdoe@mail.com",
      phone: "+491231234567",
      checkedInAt: null,
    },
    {
      name: "Jane Doe",
      email: "jane_doe@mail.com",
      phone: "+491231234567",
      checkedInAt: null,
    },
  ];

  for (const atendee of atendees) {
    await prisma.atendee.create({ data: atendee });
  }

  await prisma.table.create({
    data: { name: "Table 1", capacity: 3, atendees: { connect: [] } },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
