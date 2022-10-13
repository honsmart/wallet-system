// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy accounts
  const account1 = await prisma.account.upsert({
    where: { phone_number: "234000000000" },
    create: {
      phone_number: "234000000000",
      password: '12345',
      created: true,
    },
    update: {
        role: "ADMIN" 
     },
  });



  console.log({ account1, account2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });