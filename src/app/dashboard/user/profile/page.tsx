"use client"

import { EditProfile } from "@/components/dashboard/user/edit-profile"
import { ChangePw } from "@/components/dashboard/user/change-password"
import { reqOTP } from "@/services/auth"
import { Avatar } from "@nextui-org/avatar"
import { Spinner } from "@nextui-org/spinner"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaChalkboardTeacher } from "react-icons/fa"
import { PiStudentFill } from "react-icons/pi"

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
        <section className="pt-[4rem]">
            <div className="mt-10 shadow-lg bg-white p-6">
                <h1 className="text-3xl font-bold mb-6">Profile</h1>
                <div className="flex gap-x-10 gap-y-3 items-center flex-wrap justify-center">
                    <Avatar isBordered color="primary" className="transition-transform w-30 h-30" src="https://i.pravatar.cc/150?u=a042581f4e29026704d"/>
                    <div className="text-center md:text-start">
                        <h3 className="text-2xl font-bold text-blue-500">{user?.name}</h3>
                        <p className="text-lg">{user?.email}</p>
                        <div className="flex gap-2 bg-gray-100 rounded-full w-fit items-center px-4 py-1 mt-1 mx-auto md:mx-0">
                            {user?.role === "student"?<PiStudentFill/>:<FaChalkboardTeacher/>}
                            <p>{user?.role}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 mt-6 text-white">
                    <EditProfile/>
                    <ChangePw/>
                    {user?.is_email_verified?<div className="bg-green-400 px-4 rounded-full py-1">Email Verified</div>:
                    isPending?<Spinner/>:<button className="bg-blue-400 px-4 rounded-full py-1" onClick={handleClick}>Verify Email</button>}
                </div>
            </div>
        </section>
    )
}

export default Profile
