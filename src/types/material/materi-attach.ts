export interface MateriAttach {
    id: string;
    url: string;
    material_id: string;
    description: string;
}

export interface GetMateriAttachRes {
    message : string;
    payload : MateriAttach;
}