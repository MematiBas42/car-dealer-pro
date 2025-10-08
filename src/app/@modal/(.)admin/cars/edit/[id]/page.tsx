import { InterceptModal } from "@/components/shared/intercept-modal";
import EditCarPage from "../../../../../admin/cars/edit/[id]/page";

export default function EditCarModal(props: { params: { id: string } }) {
    return (
        <InterceptModal>
            <EditCarPage {...props} />
        </InterceptModal>
    );
}