"use client"
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useDiscussions } from "./discussion";
import { Discussion } from "@/types/discussion/discussion";
import { CardDiscus } from "./card-discussion";


export const GetDiscussions = () => {
    const {discussions}:any = useDiscussions()

    const pathname = usePathname()

    const [discussionActive, setDiscussionActive] = useState<Discussion>()
    
    return (
        <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
            <h2 className="font-semibold text-2xl">Discussions</h2>
            <div className="mt-2 flex flex-col gap-4">{discussions.length === 0? <p>there are no discussions yet.</p>:
                discussions.map((discus:Discussion, idx:number)=><CardDiscus key={idx} discus={discus}/>)
            }</div>
        </div>
    )
};