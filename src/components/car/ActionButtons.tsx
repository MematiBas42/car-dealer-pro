"use client";
import { deleteCarAction } from "@/app/_actions/car";
import { CarWithImages } from "@/config/types";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { EyeIcon, Loader2, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";

const ActionButtons = ({ car }: { car: CarWithImages }) => {
  const [isPending, startTransition] = useTransition();
  const deleteCar = (id: number) => {
    startTransition(async () => {
      // delete car logic here
      const result = await deleteCarAction(id);
      if (result.success) {
        toast.success("Car deleted successfully", {
          description: result.message,
        });
      } else {
        toast.error("Failed to delete car", {
          description: result.message,
        });
      }
    });
  };
  return (
    <div>
      <Button
        variant={"destructive"}
        className="p-2 h-fit"
        onClick={() => deleteCar(car.id)}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash className="h-4 w-4" />
        )}
      </Button>
      <Button className="p-2 h-fit" asChild>
        <Link href={routes.singleClassified(car.slug)}>
          <EyeIcon className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant={"secondary"} className="p-2 h-fit" asChild>
        <Link href={routes.admin.editCar(car.id)}>
          <PencilIcon className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default ActionButtons;
