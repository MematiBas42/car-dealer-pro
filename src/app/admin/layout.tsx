import AdminHeader from '@/components/layouts/admin-header'
import React, { PropsWithChildren } from 'react'

const AdminLayout = (
    {
        children,
    }: PropsWithChildren
) => {
  return (
    <div className='flex bg-gray-900 min-h-screen w-full'>
        {/* admib side bar */}
        <div className='flex flex-col flex-1 overflow-hidden'>
            <AdminHeader />
        </div>
      <main className='admin-scrollbar flex flex-1 flex-col gap-4
      p-4  md:gap-8 md:p-6 overflow-auto'>
        {children}
      </main>
    </div>
  )
}

export default AdminLayout
