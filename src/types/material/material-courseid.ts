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
}