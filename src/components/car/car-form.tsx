"use client"
import { updateCarSchema, UpdateCarType } from '@/app/schemas/car.schema'
import { CarWithImages } from '@/config/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Prisma } from '@prisma/client'
import React, { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form } from '../ui/form'


interface CarFormProps {
    car: CarWithImages
}
const CarForm = ({car}: CarFormProps) => {
  const [
    isPending,
    startTransition
  ] = useTransition()
  
  const form = useForm<UpdateCarType>({
    resolver: zodResolver(updateCarSchema),
    defaultValues: {

    }
  })

  const carformSubmit: SubmitHandler<UpdateCarType> = async (data) => {
    startTransition(async () => {
        
    })
  }
    return (
    <Form {...form}>
        <form action=""
            onSubmit={form.handleSubmit(carformSubmit)}
        ></form>
    </Form>
  )
}

export default CarForm
