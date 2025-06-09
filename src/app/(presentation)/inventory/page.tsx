import CarCard from '@/components/inventory/car-card'
import CarsList from '@/components/inventory/cars-list'
import { AwaitedPageProps, Favourites, PageProps } from '@/config/types'
import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
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
    const sourceId = await getSourceId()
    const favs = await redis.get<Favourites>(sourceId ?? "") 
  return (
    <>
        <CarsList cars={cars}
            favourites={favs ? favs.ids : []}
        />
    </>
  )
}

export default InventoryPage
