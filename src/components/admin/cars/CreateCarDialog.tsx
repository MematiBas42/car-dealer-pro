"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

import React, { useState, useTransition } from 'react'

const CreateCarDialog = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [
            isUploading, startUploadTransition
    ] = useTransition()
    const [
            isCreating, startCreateTransition
    ] = useTransition()
  return (
    <Dialog open={isModalOpen}
        onOpenChange={() => console.log('Dialog closed')}
        
    >
        <DialogTrigger asChild>
            <Button className='mt-4' size={"sm"}>
                Add new
            </Button>
        </DialogTrigger>
        <DialogContent className={cn(`max-w-6xl bg-white`)}>
            <DialogHeader>
                <DialogTitle>
                    Create new car
                </DialogTitle>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default CreateCarDialog
