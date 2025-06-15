"use client"
import { MAX_IMAGE_SIZE } from '@/config/constants';
import React, { ChangeEvent, useRef, useState } from 'react'

interface SingleImageUploaderProps {
  onUploadComplete: (url: string) => void;
}

const SingleImageUploader = (props: SingleImageUploaderProps) => {
    const { onUploadComplete } = props;
    const [preview, setPreview] = useState<string|null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadComplete, setUploadComplete] = useState(false)
    const [draggingOver, setDraggingOver] = useState(false)
    const [error, setError] = useState<string|null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.target.files?.[0];
        if (!file) {
            return 
        }
        if (file.size > MAX_IMAGE_SIZE) {
            setError(`File size exceeds ${MAX_IMAGE_SIZE / (1024 * 1024)} MB`);
            return;
        }
        setError(null);
        setIsUploading(true);

        const reader = new FileReader();
        reader.onloadend =  () => {
            setPreview(reader.result as string);
        }
        reader.readAsDataURL(file);
        try {
            const formData = new FormData();
            formData.append('file', file);
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    }
    return (
    <div>
      
    </div>
  )
}

export default SingleImageUploader
