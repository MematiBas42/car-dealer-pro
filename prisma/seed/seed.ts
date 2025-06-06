import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
    console.log("Seeding database...");
}

main().catch(async (e) => {
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
});