import { PrismaClient } from "@prisma/client";
import { seedTax } from "./tax.seed";
import { seedClass } from "./class.seed";
import { seedImage } from "./imageSeed";
import { seedAdmin } from "./admin.seed";

const prisma = new PrismaClient();
async function main() {
    //await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE;`;
    // await seedTax(prisma)

    // await seedClass(prisma);
    // await seedImage(prisma);
    await seedAdmin(prisma);
}

main().catch(async (e) => {
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
});


// 