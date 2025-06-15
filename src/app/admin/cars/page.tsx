import CarManageHeader from '@/components/admin/cars/cars-header'
import { PageProps } from '@/config/types'
import React from 'react'

const CarsPage = async (props: PageProps) => {
  const searchParams = await props.searchParams
  return (
    <>
      <CarManageHeader
        searchParams={searchParams}
      />
    </>
  )
}

export default CarsPage
