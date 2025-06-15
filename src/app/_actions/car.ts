import { auth } from "@/auth";
import { StreamableSkeletonProps } from "@/components/admin/cars/StreamableSkeletion";
import { prisma } from "@/lib/prisma";
import { randomInt } from "crypto";
import slugify from "slugify";
export const createCarAction = async (data: StreamableSkeletonProps) => {
  const session = await auth();
  if (!session)
    return {
      success: false,
      message: "Unauthorized",
    };

  let success = false;
  let carId: number | null = null;
  try {
    const make = await prisma.make.findUnique({
      where: {
        id: data.makeId as number,
      },
    });
    const model = await prisma.model.findUnique({
      where: {
        id: data.modelId as number,
      },
    });
    let title = `${data.year} ${make?.name} ${model?.name}`;
    if (data.modelVariantId) {
      const modelVariant = await prisma.modelVariant.findUnique({
        where: {
          id: data.modelVariantId as number,
        },
      });
      if (modelVariant) {
        title += ` ${modelVariant.name}`;
      }
    }

    let slug = slugify(`${title} ${data.vrm ?? randomInt(100000, 999999)}`);

    // check if slug already exists
    const slugLikeFound = await prisma.classified.count({
      where: {
        slug: {
          contains: slug,
          mode: "insensitive",
        },
      },
    });
    if (slugLikeFound) {
        slug = slugify(`${title} ${data.vrm} ${slugLikeFound + 1}`);
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to create car",
    };
  }
};
