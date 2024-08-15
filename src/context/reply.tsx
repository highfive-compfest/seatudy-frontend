import { createContext, useContext } from "react";

const ReplyContext = createContext<any>(undefined);

export const ReplyProvider = ReplyContext.Provider;

export const useReply = () => useContext(ReplyContext);