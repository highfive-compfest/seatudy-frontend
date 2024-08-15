import { createContext, useContext, useEffect, useState } from "react";
import { getDiscussionsByCourseId } from "@/services/discussion";
import { getCookie } from "cookies-next";
import { Discussion } from "@/types/discussion/discussion";
import { DiscusInstrucForm } from "./create-discuss";
import { GetDiscussions } from "./get-discussions";

const DiscussionContext = createContext<any>(undefined);

export const Discuss = ({courseId}:{courseId:string}) => {
    const accToken = getCookie("authToken") as string;
    const [discussions, setDiscussions] = useState<Discussion[]>();
    const [isEdit, setEdit] = useState(false);

    const getDiscussions = async () => {
        try {
            const res = await getDiscussionsByCourseId(courseId, accToken);
            setDiscussions(res.payload.data);
        } catch (error:any) {
            console.error(error.response);
        }
    };

    useEffect(() => {
        getDiscussions();
    }, [courseId]);
    return (
        <DiscussionContext.Provider value={{discussions, getDiscussions, courseId, isEdit, setEdit, accToken}}>
            <section className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-6">
                <DiscusInstrucForm />
                {discussions&&<GetDiscussions/>}
            </section>
        </DiscussionContext.Provider>
    )
};

export const useDiscussions = () => useContext(DiscussionContext);
