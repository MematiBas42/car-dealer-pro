import CarCard from '@/components/inventory/car-card'
import CarsList from '@/components/inventory/cars-list'
import { AwaitedPageProps, PageProps } from '@/config/types'
import { prisma } from '@/lib/prisma'
import React from 'react'

const getInventory = async(searchParams: AwaitedPageProps['searchParams']) => {
    return prisma.classified.findMany({
        include: {
            images: true,
        }
    })
}

const InventoryPage = async (props: PageProps) => {
    const searchParams = await props.searchParams
    const cars = await getInventory(searchParams)
    const count  = await prisma.classified.count()
  return (
    <>
        <CarsList cars={cars} />
    </>
  )
}

export default InventoryPage
