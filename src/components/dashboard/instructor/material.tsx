import { MaterialForm } from "./create-material";
import { GetMaterials } from "./get-materials";

export const Material = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-6">
            <MaterialForm/>
            <GetMaterials/>
        </section>
    )
};
