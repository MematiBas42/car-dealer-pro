import React from 'react'
import AdminSearch from '../admin/search'

const AdminHeader = async () => {
  return (
    <header>
       <div className="item-center flex-1 gap-4 md:gap-8 grid grid-cols-3 w-full">
        <div className='col-span-1'>
            </div>
            <AdminSearch />
            </div> 
    </header>
  )
}

export default AdminHeader
