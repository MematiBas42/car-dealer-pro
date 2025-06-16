"use client";
import { updateCarSchema, UpdateCarType } from "@/app/schemas/car.schema";
import { CarWithImages } from "@/config/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { updateCarAction } from "@/app/_actions/car";
import { toast } from "sonner";
import CarFormField from "./car-form-fields";

interface CarFormProps {
  car: CarWithImages;
}
const CarForm = ({ car }: CarFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateCarType>({
    resolver: zodResolver(updateCarSchema),
    defaultValues: {},
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
