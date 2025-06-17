"use client";
import { UpdateCarType } from "@/app/schemas/car.schema";
import React, { useCallback, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";
import {v4 as uuidv4} from "uuid"
import { generateThumbHashFromFile } from "@/lib/thumbhash-client";
import { createPngDataUri } from "unlazy/thumbhash";
type CarImages = UpdateCarType["images"];
interface MultiImageUploaderProps
  extends React.HTMLAttributes<HTMLInputElement> {
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
    }
  }, []);
  return <div></div>;
};

export default MultiImageUploader;
