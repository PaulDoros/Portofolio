import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // Clean existing data
  await prisma.contactMessage.deleteMany();

  // Create example contact message
  const message = await prisma.contactMessage.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      subject: "Project Inquiry",
      message: "I'd like to discuss a potential project. Please contact me when you have time.",
    },
  });

  console.log(`Database has been seeded. 🌱`);
  console.log(`Created contact message from ${message.name}`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
