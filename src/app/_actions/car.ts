"use server";
import { auth } from "@/auth";
import { StreamableSkeletonProps } from "@/components/admin/cars/StreamableSkeletion";
import { routes } from "@/config/routes";
import { prisma } from "@/lib/prisma";
import { generateThumbHashFromSrUrl } from "@/lib/thumbhash-server";
import { CurrencyCode } from "@prisma/client";
import { randomInt } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { createPngDataUri } from "unlazy/thumbhash";
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

    const thumbHash = await generateThumbHashFromSrUrl(data.image as string);
    const uri = createPngDataUri(thumbHash);

    const createdCar = await prisma.classified.create({
      data: {
        slug,
        title,
        year: Number(data.year),
        makeId: data.makeId as number,
        modelId: data.modelId as number,
        ...(data.modelVariantId && {
          modelVariantId: data.modelVariantId as number,
        }),
        vrm: data?.vrm ? data.vrm : null,
        price: 0,
        currency: CurrencyCode.EUR,
        odoReading: data.odoReading,
        odoUnit: data.odoUnit,
        fuelType: data.fuelType,
        bodyType: data.bodyType,
        colour: data.colour,
        transmission: data.transmission,
        ulezCompliance: data.ulezCompliance,
        description: data.description,
        doors: data.doors,
        seats: data.seats,
        images: {
          create: {
            isMain: true,
            blurhash: uri,
            src: data.image as string,
            alt: title,
          },
        },
      },
    });

    if (createdCar) {
			carId = createdCar.id;
			success = true;
		}
  } catch (error) {
    return {
      success: false,
      message: "Failed to create car",
    };
  }

  if (success && carId) {
		revalidatePath(routes.admin.cars);
		redirect(routes.admin.editCar(carId));
	} else {
		return { success: false, message: "Failed to create classified" };
	}
};
