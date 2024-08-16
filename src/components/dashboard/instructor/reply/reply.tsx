"use client"
import { useReply } from "@/context/reply";
import { createReply } from "@/services/discussion";
import { FormEvent, useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { Bubble } from "./bubble";
import { Reply } from "@/types/discussion/discussion";

export const Replies = () => {

    const {discussionId, accToken, getReplies, replies}:any = useReply()

    const [value, setValue] = useState("")

    const handleCreate = async (event:FormEvent) => {
        event.preventDefault()
        await createReply(discussionId,value,accToken)
        getReplies(1)
        const target = event.target as HTMLFormElement
        target.reset()
    }

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        console.log(value)
    }

    return (
        <>
            <form onSubmit={handleCreate} className="p-4 bg-gray-200 rounded-lg flex items-center">
                <input
                    required
                    onChange={handleChange}
                    type="text"
                    placeholder="Join the conversation"
                    className="w-full outline-none bg-inherit"
                    />
                    <button type="submit"><IoSend/></button>
            </form>
            {replies && <div className="flex flex-col gap-4 mt-4">
                {replies.map((reply:Reply, idx:number)=><Bubble key={idx} reply={reply}/>)}
            </div>}
        </>
    )
};
