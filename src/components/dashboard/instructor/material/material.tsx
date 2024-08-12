import { createContext, useContext, useEffect, useState } from "react";
import { MaterialForm } from "./create-material";
import { GetMaterials } from "./get-materials";
import { getMaterialByCourse } from "@/services/material";
import { MaterialsContextType, MaterialType } from "@/types/material/material-courseid";

const MaterialContext = createContext<MaterialsContextType|undefined>(undefined);

export const Material = ({courseId}:{courseId:string}) => {
    const [materials, setMaterials] = useState<MaterialType[]>();
    const [isEdit, setEdit] = useState(false);

    const getMaterials = async () => {
        try {
            const res = await getMaterialByCourse(courseId);
            setMaterials(res.payload);
        } catch (error:any) {
            console.error(error.response);
        }
    };

    useEffect(() => {
        getMaterials();
    }, [courseId]);
    return (
        <MaterialContext.Provider value={{materials, getMaterials, courseId, isEdit, setEdit}}>
            <section className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-6">
                <MaterialForm/>
                <GetMaterials/>
            </section>
        </MaterialContext.Provider>
    )
};

export const useMaterials = () => useContext(MaterialContext);
