"use client"

import { reqOTP } from "@/services/auth"
import { Avatar } from "@nextui-org/avatar"
import { Spinner } from "@nextui-org/spinner"
import { getCookie } from "cookies-next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Profile = () => {
    const [isPending, setPending] = useState(false)
    const [user, setUser] = useState<any>()

    const router = useRouter()

    
    useEffect(()=>{
        const userString:any = sessionStorage.getItem('user')
        const data = JSON.parse(userString);
        setUser(data)
    },[])

    const accToken = getCookie("authToken") as any
    const refreshToken = getCookie("refreshToken") as any

    const handleClick = async () => {
        setPending(true)
        try {
            await reqOTP(accToken)
            setPending(false)
            router.push("/verify-otp")
        } catch (error:any) {
            const message = error.response.data.message;
            console.log(message)
        } finally {
            setPending(false)
        }
    }

    return (
        <section className="pt-[7rem] ml-10">
            <h1 className="text-2xl font-bold ml-4">Profile</h1>
            <div className="mt-10 ml-4">
                <Avatar isBordered size="lg" className="transition-transform" src="https://i.pravatar.cc/150?u=a042581f4e29026704d"/>
                <ul className="mt-4">
                    <li>Name : {user?.name}</li>
                    <div className="flex gap-2 items-center">
                        <li>Email : {user?.email}</li>
                        {user?.is_email_verified?<div className="bg-green-400 px-4 rounded-md text-white">Verified</div>:
                        isPending?<Spinner/>:<button className="bg-blue-400 px-4 rounded-md text-white" onClick={handleClick}>Verify</button>}
                    </div>
                    <li>Role : {user?.role}</li>
                </ul>
            </div>
        </section>
    )
}

export default Profile
