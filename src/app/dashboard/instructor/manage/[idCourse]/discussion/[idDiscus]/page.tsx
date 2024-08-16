"use client"
import { ActionBtnAttach } from "@/components/dashboard/instructor/materialAttachment/action"
import { AddMateriAttach } from "@/components/dashboard/instructor/materialAttachment/add-attachment"
import { Replies } from "@/components/dashboard/instructor/reply/reply"
import { MaterialProvider } from "@/context/material-attach"
import { ReplyProvider } from "@/context/reply"
import { getDiscusById, getRepliesByDiscussionId } from "@/services/discussion"
import { getMaterialById } from "@/services/material"
import { getUserById } from "@/services/user"
import { Discussion, Reply } from "@/types/discussion/discussion"
import { MateriAttach } from "@/types/material/materi-attach"
import { MaterialType } from "@/types/material/material-courseid"
import { UserPayload } from "@/types/user/user"
import { getExtFile, getSegment } from "@/utils/utils"
import { Avatar } from "@nextui-org/avatar"
import { getCookie } from "cookies-next"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { FaFile, FaPlus } from "react-icons/fa6"
import { MdBook } from "react-icons/md"

const MaterialPage = () => {
    const accToken = getCookie("authToken") as string;
    const [discussion, setDiscussion] = useState<Discussion>();
    const [isActive, setActive] = useState("");
    const pathname = usePathname();
    const discussionId = getSegment(pathname, 6);
    const [replyActive, setReplyActive] = useState<Reply>()
    const [replies, setReplies] = useState<Reply[]>()
    const [user, setuser] = useState<UserPayload>()

    const getReplies = async () => {
        const res = await getRepliesByDiscussionId(discussionId,accToken);
        setReplies(res.payload.data);
    };
  
    const getDiscus = async () => {
        const res = await getDiscusById(discussionId);
        setDiscussion(res.payload);
    };

    const getUser = async () => {
        if (discussion) {
            const res = await getUserById(discussion.user_id)
            setuser(res.payload)                    
        }
    }

    useEffect(()=>{
        getUser()
        getReplies()
        getDiscus()
    },[])

    useEffect(()=>{
        getUser()
    },[discussion])

    if (discussion && user) return (
        <ReplyProvider value={{getReplies, isActive, setActive, accToken, discussionId, replyActive, setReplyActive, replies}}>
            <section className="p-4 mt-28 max-w-[53rem] mx-auto bg-white rounded-lg shadow-lg">
                <div className="border-black border-b-2">
                    <div className="flex gap-3 items-center border-black pb-4 border-b-2">
                        <Avatar size="lg" src={user.image_url} isBordered/>
                        <div>
                            <h1 className="font-bold">{user.name}</h1>
                            <p>{user.role}</p>
                        </div>
                    </div>
                    <div className="py-2">
                        <h1 className="font-bold text-2xl">{discussion.title}</h1>
                        <small>created at {new Date(discussion.created_at).toLocaleDateString()}</small>
                        <small className="block">update at {new Date(discussion.updated_at).toLocaleDateString()}</small>
                    </div>
                </div>
                <div className="pb-4">
                    <h2 className="mt-4 mb-1 text-xl font-bold">What topics will be discussed?</h2>
                    <p className="text-justify">{discussion.content}</p>
                </div>
                <Replies/>
            </section>
        </ReplyProvider>
    )
}

export default MaterialPage;