import { AwaitedPageProps, PageProps } from '@/config/types'
import { prisma } from '@/lib/prisma'
import React from 'react'

const getInventory = async(searchParams: AwaitedPageProps['searchParams']) => {
    return []
}

const InventoryPage = async (props: PageProps) => {
    const searchParams = await props.searchParams
    const cars = await getInventory(searchParams)
    const count  = await prisma.classified.count()
  return (
    <div>
      Invve
    </div>
  )
}

export default InventoryPage
