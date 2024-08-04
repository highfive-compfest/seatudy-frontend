import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineNotificationsNone } from "react-icons/md";

export const NotifIcon = () => {
    const [isOpen, setOpen] = useState(false)
    return (
        <div className="relative flex items-center">
            <button onClick={()=>setOpen(!isOpen)}>
                {isOpen ? <AiOutlineClose size={35}/> : <MdOutlineNotificationsNone size={35}/>}
            </button>
            <div className={`${isOpen?'block':'hidden'} absolute flex flex-col bg-gray-100 top-12 -left-[7rem] rounded-lg w-[10rem] h-[10rem]`}>
                <h1 className="m-auto">No Notification Yet</h1>
            </div>
        </div>
    )
};
