"use client";
import React, { createContext, useState, ReactNode } from "react";

interface DataContextType {
  data: { email: string; newPassword: string; token: string };
  setData: React.Dispatch<React.SetStateAction<{ email: string; newPassword: string; token: string }>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<{ email: string; newPassword: string; token: string }>({
    email: "",
    newPassword: "",
    token: "",
  });

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
