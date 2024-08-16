import { createContext, useContext, useEffect, useState } from "react";
import { getDiscussionsByCourseId } from "@/services/discussion";
import { getCookie } from "cookies-next";
import { Discussion, PaginationType } from "@/types/discussion/discussion";
import { DiscusInstrucForm } from "./create-discuss";
import { GetDiscussions } from "./get-discussions";
import { Pagination } from "@nextui-org/react";

const DiscussionContext = createContext<any>(undefined);

export const Discuss = ({courseId}:{courseId:string}) => {
    const [totalPage, setTotalPage] = useState<number|undefined>();
    const accToken = getCookie("authToken") as string;
    const [discussions, setDiscussions] = useState<Discussion[]>();
    const [isEdit, setEdit] = useState(false);

    const getDiscussions = async (page:number) => {
        try {
            const res = await getDiscussionsByCourseId(courseId, accToken,4,page);
            setTotalPage(res.payload.pagination.total_page)
            setDiscussions(res.payload.data);
        } catch (error:any) {
            console.error(error.response);
        }
    };

    useEffect(() => {
        getDiscussions(1);
    }, [courseId]);

    return (
        <DiscussionContext.Provider value={{discussions, getDiscussions, courseId, isEdit, setEdit, accToken, totalPage}}>
            <section className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-6">
                <DiscusInstrucForm />
                {discussions&&<GetDiscussions/>}
            </section>
        </DiscussionContext.Provider>
    )
};

export const useDiscussions = () => useContext(DiscussionContext);
