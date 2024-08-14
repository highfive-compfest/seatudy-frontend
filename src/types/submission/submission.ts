interface Attachment {
    id: string;
    url: string;
    description: string;
    submission_id: string
}

export interface SubmissionType {
    id: string;
    assignment_id: string;
    user_id: string;
    content: string;
    grade: number;
    attachments : Attachment[]
    created_at : string;
    updated_at : string;
}

export interface GetAllSubmissionRes {
    message : string;
    payload : SubmissionType[]
}