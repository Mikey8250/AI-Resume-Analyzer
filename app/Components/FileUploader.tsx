// import React from "react";

import { useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";

import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

function FileUploader({ onFileSelect }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files

      const file = acceptedFiles[0] || null;

      onFileSelect?.(file);
    },

    [onFileSelect]
  );

  const maxFilesize = 20 * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,

      multiple: false,

      accept: { "application/pdf": [".pdf"] },

      maxSize: maxFilesize,
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/images/pdf.png" alt="" className="size-10" />

              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {file.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                className="p-2 cursor-pointer"
                onClick={(e) => {
                  return onFileSelect?.(null);

                  e.preventDefault();
                }}
              >
                <img src="/icons/cross.svg" alt="" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto w-16 mb-2">
                {/* <img src="../../public/icons/info.svg" alt="" /> */}

                <img src="/icons/info.svg" alt="" />
              </div>

              <p className="txt-lg text-gray-500">
                <span className="font-semibold">Click to upload </span>
                or drag and drop
              </p>

              <p className="text-lg text-gray-500">
                PDF (max {formatSize(maxFilesize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUploader;
