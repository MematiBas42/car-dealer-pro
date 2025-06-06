import { PrismaClient } from "@prisma/client";
import { seedTax } from "./tax.seed";

const prisma = new PrismaClient();
async function main() {
    await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE;`;
    await seedTax(prisma)
}

main().catch(async (e) => {
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
});