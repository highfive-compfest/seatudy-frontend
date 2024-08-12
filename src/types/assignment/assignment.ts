export interface AssignmentType {
    id: string;
    course_id: string;
    title: string;
    description: string;
    due: string;
    attachments: [];
    created_at : string;
    updated_at : string;
    deleted_at : null;
}

export interface GetAssignmentsRes {
    message : string;
    payload : AssignmentType[]
}

export interface GetAssignmentRes {
    message : string;
    payload : AssignmentType
}