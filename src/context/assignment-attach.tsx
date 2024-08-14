import { createContext, useContext } from "react";

const AssignContext = createContext<any>(undefined);

export const AssignProvider = AssignContext.Provider;

export const useAssignAttach = () => useContext(AssignContext);
