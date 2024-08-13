"use client";
import { AddMateriAttach } from "@/components/dashboard/instructor/materialAttachment/add-attachment";
import { getMaterialById } from "@/services/material";
import { MaterialType } from "@/types/material/material-courseid";
import { getSegment } from "@/utils/utils";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdBook } from "react-icons/md";

const MaterialContext = createContext<any>(undefined);

const MaterialPage = () => {
  const accToken = getCookie("authToken") as string;
  const [materi, setMateri] = useState<MaterialType>();
  const [isActive, setActive] = useState("");
  const pathname = usePathname();
  const materiId = getSegment(pathname, 5);

  const getMateri = async () => {
    const res = await getMaterialById(materiId);
    setMateri(res.payload);
  };

  useEffect(() => {
    getMateri();
  }, []);

  useEffect(() => {
    console.log(materi);
  }, [materi]);

  const getFileName = (url: string) => {
    const urlParts = url.split("/");
    const fileNameWithParams = urlParts[urlParts.length - 1];

    // Decode and return the filename with extension
    const decodedFileName = decodeURIComponent(fileNameWithParams.split("?")[0]);
    return decodedFileName;
  };

  if (materi)
    return (
      <MaterialContext.Provider value={{ getMateri, isActive, setActive, accToken, materiId }}>
        <section className="p-4 mt-28 max-w-[53rem] mx-auto bg-white rounded-lg shadow-lg">
          <div className="flex items-center gap-4 border-black pb-4 border-b-2">
            <div className="p-2 bg-blue-500 rounded-full w-fit">
              <MdBook size={26} color="white" />
            </div>
            <div>
              <h1 className="font-bold text-3xl">{materi.title}</h1>
              <small>created at {new Date(materi.created_at).toLocaleDateString()}</small>
              <small className="block">update at {new Date(materi.updated_at).toLocaleDateString()}</small>
            </div>
          </div>
          <div className="border-black pb-4 border-b-2">
            <h2 className="mt-4 mb-1 text-xl font-bold">Description</h2>
            <p className="text-justify">{materi.description}</p>
          </div>
          <h2 className="mt-4 mb-1 text-xl font-bold">Attachments</h2>
          <AddMateriAttach />
          <div>
            {materi.attachments.length === 0 ? (
              <p>there are no attachments yet.</p>
            ) : (
              materi.attachments.map((content, idx) => {
                const fileName = getFileName(content.url);
                return (
                  <div key={idx}>
                    <p>{fileName}</p>
                    <p>{content.description}</p>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </MaterialContext.Provider>
    );

  return null; // Return null if materi is not available
};

export default MaterialPage;
