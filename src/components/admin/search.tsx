"use client"
import React from 'react'
import SearchInput from '../shared/search-input'
import { usePathname } from 'next/navigation'

const AdminSearch = () => {
  const pathname = usePathname()
    return (
    <div>
      <SearchInput
      placeholder={`search ${pathname.split("/")[2]}`}
       className='w-full focus-visible:ring-0 placeholder:text-muted
       text-muted appearance-none bg-gray-800 border border-gray-800 pl-8'
      />
    </div>
  )
}

export default AdminSearch
