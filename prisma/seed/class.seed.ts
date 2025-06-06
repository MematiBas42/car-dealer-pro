import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

export async function seedClass(prisma: PrismaClient) {
  const makes = await prisma.make.findMany({
    include: {
      models: {
        include: {
          modelVariants: true,
        },
      },
    },
  });

  const classifiedsData : Prisma.ClassifiedCreateManyInput[] = [];
  for (let i = 0 ; i < 25; i ++) {
    const make = faker.helpers.arrayElement(makes);
    if (!make.models.length) continue;
    const model = faker.helpers.arrayElement(make.models);
    
  }
}
