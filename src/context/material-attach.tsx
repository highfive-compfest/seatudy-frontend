import { createContext, useContext } from "react";

const MaterialContext = createContext<any>(undefined);

export const MaterialProvider = MaterialContext.Provider;

export const useMaterialAttach = () => useContext(MaterialContext);

