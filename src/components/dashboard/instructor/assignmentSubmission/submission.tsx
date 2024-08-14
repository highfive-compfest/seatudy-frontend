"use client"
import { useEffect, useState } from "react";
import { getSubmission } from "@/services/submission";
import { SubmissionType } from "@/types/submission/submission";
import { useAssignAttach } from "@/context/assignment-attach";

export const Submission = () => {
    const {assignmentId}:any = useAssignAttach()

    const [submissions, setSubmissions] = useState<SubmissionType[]>()

    useEffect(()=>{
        const getSubmissions = async () => {
            const res = await getSubmission(assignmentId)
            setSubmissions(res.payload)
        }
        getSubmissions()
    },[])

    useEffect(()=>{
        console.log(submissions)
    },[submissions])

    return (
        <>
            <h2 className="mt-4 mb-1 text-xl font-bold">Submission</h2>
            {submissions && <div>
                {submissions.length===0?<p>there are no submission yet</p>:
                submissions.map((submission, idx)=>{
                    return (
                        <div>
                            <h1>{submission.content}</h1>
                        </div>
                    )
                })
                }
            </div>}
        </>
    )
};
