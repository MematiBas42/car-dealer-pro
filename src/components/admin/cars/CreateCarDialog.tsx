"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { readStreamableValue, useActions, useUIState } from "ai/rsc";
import { AI } from "@/app/_actions/ai";

import React, { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SingleImageSchema,
  SingleImageType,
} from "@/app/schemas/images.schema";
import { StreamableSkeletonProps } from "./StreamableSkeletion";
import { CarAISchema } from "@/app/schemas/car-ai";
import { z } from "zod";

const CreateCarDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, startUploadTransition] = useTransition();
  const [isCreating, startCreateTransition] = useTransition();

  const { generateCar } = useActions<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();

  const imageForm = useForm<SingleImageType>({
    resolver: zodResolver(SingleImageSchema),
  });

  const createForm = useForm<StreamableSkeletonProps>({
    resolver: zodResolver(
      CarAISchema.extend({
        make: z.object({
          id: z.number().int(),
          name: z.string(),
          image: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
        }),
      })
    ),
  });

  const handleImageUpload = async (url: string) => {
    imageForm.setValue("image", url);
  };

  const onImageSubmit: SubmitHandler<SingleImageType> = async (data) => {
    startUploadTransition(async () => {
      const responseMessage = await generateCar(data.image);
      if (!responseMessage) return;
      setMessages((prev) => [...prev, responseMessage]);
      for await (const value of readStreamableValue(responseMessage.car)) {
        if (value){ createForm.reset(value)}
      }
    });
  };

  const onCreateSubmit: SubmitHandler<StreamableSkeletonProps> =  (data) => {
    startCreateTransition(async () => {
        setMessages([]);
        
    })
  }
  return (
    <Dialog open={true} onOpenChange={() => console.log("Dialog closed")}>
      <DialogTrigger asChild>
        <Button className="mt-4" size={"sm"}>
          Add new
        </Button>
      </DialogTrigger>
      <DialogContent className={cn(`max-w-6xl bg-white`)}>
        <DialogHeader>
          <DialogTitle>Create new car</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCarDialog;
