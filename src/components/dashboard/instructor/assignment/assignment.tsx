import { createContext, useContext, useEffect, useState } from "react";
import { getAssignmentByCourse } from "@/services/assignment";
import { getCookie } from "cookies-next";
import { AssignmentsContextType, AssignmentType } from "@/types/assignment/assignment";
import { AssignmrntForm } from "./create-assignment";
import { GetAssignments } from "./get-assignments";

const AssignmentContext = createContext<AssignmentsContextType|undefined>(undefined);

export const Assignment = ({courseId}:{courseId:string}) => {
    const accToken = getCookie("authToken") as string;
    const [assignments, setAssignments] = useState<AssignmentType[]>();
    const [isEdit, setEdit] = useState(false);

    const getAssignments = async () => {
        try {
            const res = await getAssignmentByCourse(courseId, accToken);
            setAssignments(res.payload);
        } catch (error:any) {
            console.error(error.response);
        }
    };

    useEffect(() => {
        getAssignments();
    }, [courseId]);

    return (
        <AssignmentContext.Provider value={{assignments, getAssignments, courseId, isEdit, setEdit, accToken}}>
            <section className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-6">
                <AssignmrntForm/>
                <GetAssignments/>
            </section>
        </AssignmentContext.Provider>
    )
};

export const useAssignments = () => useContext(AssignmentContext);