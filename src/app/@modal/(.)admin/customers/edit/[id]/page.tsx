import { InterceptModal } from "@/components/shared/intercept-modal";
import EditCustomerForm from "@/components/admin/customers/EditCustomerForm";
import { prisma } from "@/lib/prisma";
import { routes } from "@/config/routes";
import { redirect } from "next/navigation";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default async function EditCustomerModal({ params }: { params: { id: string } }) {
    const customerId = Number(params.id);
    if (isNaN(customerId)) {
        redirect(routes.admin.customers);
    }

    const customer = await prisma.customer.findUnique({
        where: { id: customerId },
        include: { classified: true },
    });

    if (!customer) {
        redirect(routes.admin.customers);
    }

    return (
        <InterceptModal>
            <DialogHeader>
              <DialogTitle>Edit Customer Details</DialogTitle>
            </DialogHeader>
            <div className="py-4 overflow-y-auto">
                <EditCustomerForm customer={customer} />
            </div>
        </InterceptModal>
    );
}