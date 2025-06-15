"use server"
import React from 'react'
import { CarAI, CarAISchema } from '@/app/schemas/car-ai'
import { Make } from '@prisma/client';
export type StreamableSkeletonProps = Partial<Omit<CarAI, "make">> & {
	make?: Make;
	done?: boolean;
};

const StreamableSkeletion = async (props: StreamableSkeletonProps) => {
    const {
		image,
		title,
		odoReading,
		fuelType,
		transmission,
		description,
		bodyType,
		seats,
		ulezCompliance,
		doors,
		colour,
		vrm,
		odoUnit,
		make,
		done,
	} = props;
  return (
    <div>
      
    </div>
  )
}

export default StreamableSkeletion
