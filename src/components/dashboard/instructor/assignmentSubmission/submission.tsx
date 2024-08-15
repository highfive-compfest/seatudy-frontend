"use client"
import { useEffect, useState } from "react";
import { getSubmission } from "@/services/submission";
import { SubmissionType } from "@/types/submission/submission";
import { useAssignAttach } from "@/context/assignment-attach";
import { CardSubmission } from "./card";
import { optionsDate } from "@/utils/utils";

export const Submission = () => {
    const {assignmentId}:any = useAssignAttach()

    const [submissions, setSubmissions] = useState<SubmissionType[]>()

    const getSubmissions = async () => {
        const res = await getSubmission(assignmentId)
        setSubmissions(res.payload)
    }

    useEffect(()=>{
        getSubmissions()
    },[])

    useEffect(()=>{
        console.log(submissions)
    },[submissions])

    return (
        <>
            <h2 className="mt-4 mb-1 text-xl font-bold">Submission</h2>
            {submissions && <div className="mt-4 flex flex-col gap-4">
                {submissions.length===0?<p>there are no submission yet</p>:
                submissions.map((submission, idx)=><CardSubmission key={idx} getSubmissions={getSubmissions} submission={submission}/>)
                }
            </div>}
        </>
    )
};
