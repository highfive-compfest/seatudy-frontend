import { Dispatch, SetStateAction } from "react";

interface Attachment {
    id: string;
    url: string;
    material_id: string;
    description: string;
}

export interface MaterialType {
    id: string;
    course_id: string;
    title: string;
    description: string;
    attachments: Attachment[];
    created_at : string;
    updated_at : string;
    deleted_at : null;
}

export interface GetMaterialsRes {
    message : string;
    payload : MaterialType[];
}

export interface GetMaterialRes {
    message : string;
    payload : MaterialType;
}

export interface MaterialsContextType {
    materials: MaterialType[] | undefined;
    getMaterials: () => Promise<void>;
    courseId : string;
    isEdit : boolean;
    setEdit : Dispatch<SetStateAction<boolean>>
}