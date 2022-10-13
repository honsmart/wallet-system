// // prisma/seed.ts

// import { PrismaClient } from '@prisma/client';

// // initialize Prisma Client
// const prisma = new PrismaClient();

// async function main() {
//   // create two dummy accounts
//   const account1 = await prisma.account.upsert({
//     where: { phone_number: "2348110130288" },
//     update: {},
//     create: {
//       phone_number: "2348110130288",
//       password: '1234567890',
//       created: true,
//     },
//   });

//   const account2 = await prisma.account.upsert({
//     where: { phone_number: "2347054146503" },
//     update: {},
//     create: {
//       phone_number: "2347054146503",
//       password: '1234567890',
//       created: true,
//     },
//   });

//   console.log({ account1, account2 });
// }

// // execute the main function
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     // close Prisma Client at the end
//     await prisma.$disconnect();
//   });