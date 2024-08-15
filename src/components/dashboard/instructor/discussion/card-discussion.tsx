"use client"
import { getUserById } from "@/services/user";
import { Discussion } from "@/types/discussion/discussion";
import { UserPayload } from "@/types/user/user";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ActionDiscusButton } from "./action";

export const CardDiscus = ({discus}:{discus:Discussion}) => {
    const [user, setuser] = useState<UserPayload>()

    const pathname = usePathname()
                    
    useEffect(()=>{
        const getUser = async () => {
            const res = await getUserById(discus.user_id)
            setuser(res.payload)                   
        }
        getUser()
    },[discus])
    
    return(
        <div className="relative">
            <Link href={`${pathname}/discussion/${discus.id}`} className="hover:bg-gray-200 border-2 border-gray-200 px-4 py-3 rounded-lg flex flex-col group">
                <div className="flex gap-x-4 items-center">
                    {user && <Avatar isBordered src={user.image_url}/>}
                    <div>
                        <h2 className="font-bold">{user?.name}</h2>
                        <p>{user?.role}</p>
                    </div>
                </div>
                <div className="border-t-2 group-hover:border-black mt-4">
                    <h3 className="font-bold mt-2">{discus.title}</h3>
                    <p>{discus.content}</p>
                </div>
            </Link>
            <ActionDiscusButton discusId={discus.id}/>
        </div>
    )
};
