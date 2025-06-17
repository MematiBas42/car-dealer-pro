"use client"
import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import { CarImages } from './mutil-image-uploader';

interface DragAndDropProps {
    isUploading: boolean;
    setIsUploading: (isUploading: boolean) => void;
    items: CarImages;
    setFiles: (files: File[]) => void;
}

const DragAndDrop = (props: DragAndDropProps) => {
    const { isUploading, setIsUploading, items, setFiles } = props;
    const dropref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [filesRejected, setFilesRejected] = useState<string[]>([])
    const [isError, setIsError] = useState({
        status: false,
        message: ''
    })

    const clearError = useCallback(() => {
        setIsError({
            status: false,
            message: ''
        });
    }, []);
    const handleFileRejected = useCallback(() => {}, []);
    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {}
    const handleClick  = ()=> inputRef.current?.click();
    const handleDrop = (e: DragEvent) => {}
    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }
    return (
    <div>
      
    </div>
  )
}

export default DragAndDrop
