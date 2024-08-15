"use client"
import { getUserById } from "@/services/user";
import { Reply } from "@/types/discussion/discussion";
import { UserPayload } from "@/types/user/user";
import { optionsDate } from "@/utils/utils";
import { Avatar } from "@nextui-org/avatar";
import { getCookie } from "cookies-next";
import { useEffect, useRef, useState } from "react";
import { ActionBtnReply } from "./action";
import { getReplyById, updateReply } from "@/services/discussion";
import { useReply } from "@/context/reply";

export const Bubble = ({reply}:{reply:Reply}) => {
    const userId = getCookie("userId")
    const [user, setUser] = useState<UserPayload>()
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement|null>(null);
    const [isEdit, setEdit] = useState("")

    const {accToken, getReplies}:any = useReply()

    const resizeTextarea = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto"; // Reset height
            textarea.style.width = "auto"; // Reset width
            textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
            textarea.style.width = `${textarea.scrollWidth}px`; // Set new width
        }
      };

    useEffect(()=>{
        if (reply) {
            const getUser = async () => {
                    const res = await getUserById(reply.user_id)
                    setUser(res.payload)                    
                }
            const getReply = async () => {
                const res = await getReplyById(reply.id)
                setValue(res.payload.content)
            }
            getReply()
            getUser()
        }
    },[reply])

    useEffect(() => {
        resizeTextarea();
    }, [value]);

    const handleChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value)
        console.log(value)
    }

    const saveReply = async () => {
        await updateReply(reply.id, value, accToken)
        getReplies()
        setEdit("")
    }

    const created = new Date(reply.created_at).toLocaleDateString(undefined, optionsDate);
    const updated = new Date(reply.updated_at).toLocaleDateString(undefined, optionsDate);
    const createdDate = new Date(reply.created_at).toLocaleDateString();
    const updatedDate = new Date(reply.updated_at).toLocaleDateString();
    

    return (
        <div className={`p-4 rounded-lg bg-gray-200 max-w-[20rem] self-start ${userId === reply.user_id?"self-start":"self-end"}`}>
            {user && <div className="flex justify-between border-black border-b-2 pb-2">    
                <div className="flex gap-2 items-center">
                    <Avatar src={user.image_url} isBordered/>
                    <div className="">
                        <small className="font-bold">{user.name}</small>
                        <small className="block">{user.role}</small>
                    </div>
                </div>
                {userId===reply.user_id && <ActionBtnReply setEdit={setEdit} replyId={reply.id}/>}
            </div>}
            <textarea value={isEdit !== reply.id? reply.content:value} disabled={isEdit !== reply.id} ref={textareaRef} rows={1} onChange={handleChange} className="ml-1 mt-1 break-words resize-none outline-none bg-inherit"></textarea>
            {isEdit?
            <div className="flex gap-2 justify-end text-white">
                <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full" onClick={()=>setEdit("")}>Cancel</button>
                <button onClick={saveReply} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full">Save</button>
            </div>:
            <small className="block text-end">{
                created !== updated?
                `${updatedDate} (updated)`:
                createdDate
            }</small>}
        </div>
    )
};
