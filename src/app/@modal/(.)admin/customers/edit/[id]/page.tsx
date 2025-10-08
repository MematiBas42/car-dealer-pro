import { InterceptModal } from "@/components/shared/intercept-modal";
import EditCustomerPage from "../../../../../admin/customers/edit/[id]/page";

export default function EditCustomerModal(props: { params: { id: string } }) {
    return (
        <InterceptModal>
            <EditCustomerPage {...props} />
        </InterceptModal>
    );
}