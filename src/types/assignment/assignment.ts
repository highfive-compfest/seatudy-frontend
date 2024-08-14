import { Dispatch, SetStateAction } from "react";

interface Attachment {
    id: string;
    url: string;
    assignment_id: string;
    description: string;
    submission_id: string | null
}

export interface AssignmentType {
    id: string;
    course_id: string;
    title: string;
    description: string;
    due: string;
    attachments: Attachment[];
    created_at : string;
    updated_at : string;
    deleted_at : null;
}

export interface PostAssignment {
    course_id: string;
    title: string;
    description: string;
    due: string;
}

export interface EditAssignment {
    title: string;
    description: string;
    due: string;
}

export interface GetAssignmentsRes {
    message : string;
    payload : AssignmentType[]
}

export interface GetAssignmentRes {
    message : string;
    payload : AssignmentType
}

export interface AssignmentsContextType {
    assignments: AssignmentType[]|undefined;
    getAssignments: () => Promise<void>;
    courseId : string;
    isEdit : boolean;
    setEdit : Dispatch<SetStateAction<boolean>>;
    accToken: string;
}

// export interface AssignmentAttach {
//     id: string;
//     url: string;
//     material_id: string;
//     description: string;
// }

// export interface GetMateriAttachRes {
//     message : string;
//     payload : MateriAttach;
// }