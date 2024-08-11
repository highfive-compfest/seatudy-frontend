interface Attachment {
    id: string;
    url: string;
    material_id: string;
    description: string;
}

export interface Material {
    id: string;
    course_id: string;
    title: string;
    description: string;
    attachments: Attachment[];
    created_at : string;
    updated_at : string;
    deleted_at : null;
}

export interface GetMaterialRes {
    message : string;
    payload : Material[];
}