"use client";

import Image from "next/image";
import React, { useState } from "react";
import SingleFileUpload from "../components/singleFile";

export default function App() {
  const [fileData, setPreviewFileData] = useState(
    {} as {
      previewType: string;
      previewUrl: string | ArrayBuffer | null;
      previewName: string;
      isDragging: boolean;
      isLoading: boolean;
    }
  );

  const getPreviewFileData = (file: any) => {
    setPreviewFileData(file);
  };

  const [uploadingStatus, setUploadingData] = useState(false);

  const isUploading = (flag: boolean) => {
    setUploadingData(flag);

    if (flag) {
      setTimeout(() => {
        setUploadingData(!flag);
      }, 5000);
    }
  };

  const [getFile, setFileData] = useState({});

  const getFileData = (file: any) => {
    setFileData(file);
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-5">
      <SingleFileUpload
        getPreview={getPreviewFileData}
        getFileObj={getFileData}
        isUploading={isUploading}
        uploadingStatus={uploadingStatus}
        uploadBtn={"Save"}
        progressBtn={"Saving..."}
      >
        <div className="m-5">
          <div className="flex items-center justify-center">
            {!fileData || !fileData.previewUrl ? (
              <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-10">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
              </label>
            ) : (
              <div className="flex items-center justify-center">
                {fileData.previewType != "video" ? (
                  <Image
                    className="object-contain rounded-2xl w-72 h-56"
                    src={fileData.previewUrl as string}
                    height={224}
                    width={300}
                    alt="image"
                  />
                ) : (
                  <video
                    autoPlay
                    loop
                    className="h-64 w-72 object-contain rounded-2xl"
                  >
                    <source
                      src={fileData.previewUrl as string}
                      type="video/mp4"
                    />
                  </video>
                )}
              </div>
            )}
          </div>
          <p className="flex items-center justify-center text-center">
            {fileData ? fileData.previewName : ""}
          </p>
        </div>
      </SingleFileUpload>
    </main>
  );
}
