"use client";
import { OTPSchema, OTPSchemaType } from "@/app/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";



const OtpForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<OTPSchemaType>({
    resolver: zodResolver(OTPSchema),
  });
  return <div className="min-h-[calc(100vh-4rem)] flex w-full flex-1 justify-center
  px-6 pt-10 lg:items-center lg:pt-0">
    <div className="flex w-full max-w-lg flex-col">
            <h3 className="mb-4 text-4xl md:text-5xl text-center">
                One time password
            </h3>
            <p className="mb-12 text-center text-slate-500 ">
                Enter 6 digits code send to your email. </p>
    </div>
  </div>;
};

export default OtpForm;
