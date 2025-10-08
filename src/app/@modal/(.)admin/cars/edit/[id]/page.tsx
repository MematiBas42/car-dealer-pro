import { InterceptModal } from "@/components/shared/intercept-modal";
import CarForm from "@/components/car/car-form";
import { prisma } from "@/lib/prisma";
import { routes } from "@/config/routes";
import { redirect } from "next/navigation";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default async function EditCarModal({ params }: { params: { id: string } }) {
    const carId = Number(params.id);
    if (isNaN(carId)) {
        redirect(routes.admin.cars);
    }

    const car = await prisma.classified.findUnique({
        where: { id: carId },
        include: { images: true },
    });

    if (!car) {
        redirect(routes.admin.cars);
    }

    return (
        <InterceptModal>
            <DialogHeader>
              <DialogTitle>Edit Vehicle Details</DialogTitle>
            </DialogHeader>
            <div className="py-4 overflow-y-auto">
                <CarForm car={car} />
            </div>
        </InterceptModal>
    );
}