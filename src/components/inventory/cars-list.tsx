import { CarWithImages } from '@/config/types'
import React from 'react'
import CarCard from './car-card'

interface CarsListProps {
    cars: CarWithImages[]
}

const CarsList = ({cars}: CarsListProps) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />

      ))}
    </div>
  )
}

export default CarsList
