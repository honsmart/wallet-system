// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.account.create({data:{
    phone_number: String("234000000000"),
    password: String("12$2b$20$gMV1rUbJPC8QShLjMSb1wOlzElM1X/ploR3fT7knaPIOJ.SMn/iv6345"),
    hashedRt: ""
}});

const adminUpdate = await prisma.account.update({
  where: {
      id: newUser.id
  },
  data: { 
   role: "ADMIN",
  }
})

  console.log({ adminUpdate });
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