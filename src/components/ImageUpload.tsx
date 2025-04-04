/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

import config from "@/lib/config";
import logger from "@/lib/logger";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: FileUploadProps) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{
    filePath: string;
  } | null>(null);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onError = (error: any) => {
    logger.error(error.message);
    toast.error("Failed to upload file", {
      description: error.message,
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success("File uploaded successfully", {
      description: `${res.filePath} uploaded successfully`,
    });
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File size too large", {
          description: "Please upload a file that is less than 20MB in size",
        });

        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.error("File size too large", {
          description: "Please upload a file that is less than 50MB in size",
        });
        return false;
      }
    }

    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        folder={folder}
        accept={accept}
        className="hidden"
      />
      <div className="flex flex-col gap-2">
        <p className="text-base font-semibold text-light-100">{placeholder}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (ikUploadRef.current) {
              // @ts-expect-error - ikUploadRef.current is not typed
              ikUploadRef.current.click();
            }
          }}
          className="upload-btn form-input"
        >
          <Image
            src="/icons/upload.svg"
            alt="upload-icon"
            width={20}
            height={20}
          />
          <p className="text-base text-light-100">Upload a File</p>
          {file && <p className="upload-filename">{file.filePath}</p>}
        </button>
        {file && (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        )}
      </div>
    </ImageKitProvider>
  );
};

export default ImageUpload;
