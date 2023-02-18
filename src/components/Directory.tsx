import { faFile, faFileCirclePlus, faFolder, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Directory = () => {
  const [files, setFiles] = useState([
    {
      icon: faFile,
      numberFiles: "5 Files",
      typeFile: "PDF",
      backgroundColor: "bg-[#fceceb]",
      color: "text-[#f78988]",
    },
    {
      icon: faImage,
      numberFiles: "2 Files",
      typeFile: "Images",
      backgroundColor: "bg-[#ddfce6]",
      color: "text-[#72cc97]",
    },
    {
      icon: faFileCirclePlus,
      numberFiles: "3 Files",
      typeFile: "Other",
      backgroundColor: "bg-[#ebf8ff]",
      color: "text-[#6cb1e9]",
    },
  ]);

  return (
    <div className="2xl:min-w-[290px] lg:w-[75px] hidden lg:flex flex-col border bg-[#fffafa] dark:bg-[#444444]  dark:text-white dark:border dark:border-[#5a5a5a]">
      <div className="p-5 flex justify-center 2xl:justify-start items-center 2xl:space-x-2 ">
        <p className="font-bold tracking-wide hidden 2xl:flex ">Directory</p>
        <FontAwesomeIcon icon={faFolder} className="text-gray-400 " />
      </div>
      <hr />
      <div className="p-5 w-full flex flex-col ">
        <div className="flex items-center justify-center 2xl:justify-start">
          <p className="text-xs xl:text-md">Files</p>
          <span className="bg-gray-100 px-2 rounded-full text-xs ml-2 hidden">10</span>
        </div>
        <div className="mt-6 space-y-5">
          {files.map((file, idx) => (
            <div className="flex items-center justify-center 2xl:justify-start">
              <FontAwesomeIcon
                icon={file?.icon}
                className={`${file.backgroundColor} ${file.color} cursor-pointer p-2 rounded-lg !w-5 !h-5 transition-all`}
              />
              <div className="2xl:flex flex-col ml-2 text-xs hidden">
                <span>{file?.numberFiles}</span>
                <span className="text-gray-400 text-[10px]">{file?.typeFile}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Directory;
