"use client";
import { updateCarSchema, UpdateCarType } from "@/app/schemas/car.schema";
import { CarWithImages } from "@/config/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CurrencyCode, Prisma } from "@prisma/client";
import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { updateCarAction } from "@/app/_actions/car";
import { toast } from "sonner";
import CarFormField from "./car-form-fields";

interface CarFormProps {
  car: CarWithImages;
}

function extractKey(url: string) {
  const nextUrl = new URL(url);
  nextUrl.href = url;
  const regex = /upload\/.+/;
  const match = url.match(regex);

  return match ? match[0] : url;
}
const CarForm = ({ car }: CarFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateCarType>({
    resolver: zodResolver(updateCarSchema),
    defaultValues: {
      id: car.id,
      odoUnit: car.odoUnit,
      currency: CurrencyCode.EUR,
      ...(car && {
        images: car.images
          ? car.images.map((image, index) => ({
              ...image,
              id: index + 1, // Assuming images are indexed starting from 1
              percentage: 100, // Default percentage for each image
              key: extractKey(image.src), // Extract key from the image URL
              done: true,
            }))
          : [],
        make: car.makeId.toString(),
        model: car.modelId.toString(),
        modelVariant: car.modelVariantId?.toString(),
        year: car.year.toString(),
        vrm: car.vrm ?? "",
        description: car.description ?? "",
        fuelType: car.fuelType,
        bodyType: car.bodyType,
        transmission: car.transmission,
        colour: car.colour,
        ulezCompliance: car.ulezCompliance,
        status: car.status,
        odoReading: car.odoReading,
        seats: car.seats,
        doors: car.doors,
        price: car.price / 100,
      }),
    },
  });

  const carformSubmit: SubmitHandler<UpdateCarType> = async (data) => {
    startTransition(async () => {
      const { success, message } = await updateCarAction(data);
      if (!success) {
        toast.error("Error updating this car", {
          description: message,
          duration: 2500,
        });
      }
    });
  };
  return (
    <Form {...form}>
      <form action="" onSubmit={form.handleSubmit(carformSubmit)}>
        <h1 className="text-3xl font-bold mb-6 text-muted">
          Upload vehicles details
        </h1>
        <div className="w-full mx-auto grid grid-cols-2 gap-6">
          <CarFormField />
        </div>
      </form>
    </Form>
  );
};

export default CarForm;
