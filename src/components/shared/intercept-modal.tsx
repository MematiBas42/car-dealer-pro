'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function InterceptModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.focus();
  }, []);

  function onDismiss() {
    router.back();
  }

  return (
    <Dialog
        open
        onOpenChange={(isOpen) => {
            if (!isOpen) {
                onDismiss();
            }
        }}
    >
        <DialogContent className="h-[90vh] w-[90vw] max-w-[90vw] flex flex-col">
            {children}
        </DialogContent>
    </Dialog>
  );
}
