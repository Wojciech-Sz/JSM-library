/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  IKImage,
  ImageKitProvider,
  IKUpload,
} from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

import config from "@/lib/config";
import { RequestError } from "@/lib/http-errors";
import logger from "@/lib/logger";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(
      `${config.env.apiEndpoint}/api/auth/imagekit`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new RequestError(
        response.status,
        "Failed to authenticate",
        {
          error: [errorText],
        }
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new RequestError(500, "Failed to authenticate", {
      error: [error?.message],
    });
  }
};

const ImageUpload = () => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{
    filePath: string;
  } | null>(null);

  const onError = (error: any) => {
    logger.error(error.message);
    toast.error("Failed to upload file", {
      description: error.message,
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    toast.success("File uploaded successfully", {
      description: `${res.filePath} uploaded successfully`,
    });
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
        fileName="test-upload.png"
      />
      <p className="text-base text-light-100">
        Upload University ID Card
      </p>
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
        <p className="text-base text-light-100">
          Upload a File
        </p>

        {file && (
          <p className="upload-filename">{file.filePath}</p>
        )}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
