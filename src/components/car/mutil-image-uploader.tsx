"use client";
import { UpdateCarType } from "@/app/schemas/car.schema";
import React, { useCallback, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import {v4 as uuidv4} from "uuid"
import { generateThumbHashFromFile } from "@/lib/thumbhash-client";
import { createPngDataUri } from "unlazy/thumbhash";
import { ProcessArgs, Uploader } from "@/lib/uploader";
import { da } from "@faker-js/faker";
import { cn } from "@/lib/utils";
export type CarImages = UpdateCarType["images"];
interface MultiImageUploaderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

type ImageProgess = {
    uuid: string;
    progress: number;
}

const MultiImageUploader = (props: MultiImageUploaderProps) => {
  const { className, ...rest } = props;
  const form = useFormContext<UpdateCarType>();
  const {fields, replace} = useFieldArray({
    control: form.control,
    name: "images",
    keyName: "uuid", // Use 'uuid' as the key name for each image
  });
  const [items, setItems] = useState<CarImages>(fields)
  const [progress, setProgress] = useState<ImageProgess[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleItemProgress = useCallback((updates:ImageProgess) => {
    setProgress((prev) => {
        const index = prev.findIndex((item) => item.uuid === updates.uuid);
        if (index === -1) {
            return [...prev, updates];
        }
        const newProgess = [...prev];
        newProgess[index] = {...newProgess[index], ...updates};
        return newProgess;
    })
  },[])

  const handleItemUpdate = useCallback((newItems: CarImages) => {
    replace(newItems);
    setItems(newItems);
  },[replace])
  const setFiles = useCallback(async (validfiles: File[]) => {
    const files = Object.values(validfiles);
    setIsUploading(files.length > 0);
    let id = items.length + 1 
    const newImagedata: CarImages =[]
    for (const file of files) {
      const uuid = uuidv4();
      const hash = await generateThumbHashFromFile(file)
      const base64 = createPngDataUri(hash);
      const data = {
        id, 
        uuid, 
        percentage: 0,
        alt: file.name,
        key: "",
        src: "",
        base64,
        done: false
      }
      newImagedata.push(data);
      id++;
      const options = {file, uuid}
      const uploader = new Uploader(options)
      uploader.onProgress((progress: ProcessArgs) => {
        if (progress.percentage !== data.percentage) {
          data.src = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${progress.key}`;
          data.key = progress.key || '';
          handleItemProgress({
            uuid, 
            progress: progress.percentage,
          })

          const clone = items.concat(newImagedata)
          setItems(clone);
        }
      }).onError((error: Error) => {
        setIsUploading(false);
        console.error("Upload error:", error);
      }).onComplete(() => {
        data.done = true;
        const clone = items.concat(newImagedata).map((item) => ({
          ...item,
          percentage: 100,
          
        }))
        setItems(clone);
        replace(clone.map((item) => ({
          src: item.src,
          alt: item.alt,
        })))
        setIsUploading(false);
      })
      uploader.start();
    }
  }, [items, handleItemProgress, replace]);

  const remove = (i: number) => {
    setItems((prev) => prev.filter((item) => item.id !== i));
    replace(items.filter((item) => item.id !== i));
  }
  return <div className={cn(`space-y-3`)}>
    {/* drag and drop */}
    <div className="relative overflow-hidden rounded-lg">
      {/* grag and grop context */}
    </div>
  </div>;
};

export default MultiImageUploader;
