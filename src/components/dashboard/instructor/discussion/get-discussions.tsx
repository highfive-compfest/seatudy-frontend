"use client"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDiscussions } from "./discussion";
import { Discussion, PaginationType } from "@/types/discussion/discussion";
import { CardDiscus } from "./card-discussion";
import { Pagination } from "@nextui-org/react";


export const GetDiscussions = () => {
    const {discussions, getDiscussions, totalPage}:any = useDiscussions()
    const [currentPage, setCurrentPage] = useState(1)

    const pathname = usePathname()

    const [discussionActive, setDiscussionActive] = useState<Discussion>()

    useEffect(()=>{
        getDiscussions(currentPage)
    },[currentPage])
    
    return (
        <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
            <h2 className="font-semibold text-2xl">Discussions</h2>
            <div className="mt-2 flex flex-col gap-4">{discussions.length === 0? <p>there are no discussions yet.</p>:
                discussions.map((discus:Discussion, idx:number)=><CardDiscus key={idx} discus={discus}/>)
            }</div>
            <div className="flex justify-center mt-4">
                {totalPage&&<Pagination onChange={setCurrentPage} total={totalPage}/>}
            </div>
        </div>
    )
};