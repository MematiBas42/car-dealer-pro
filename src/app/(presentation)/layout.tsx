import PublicLayout from '@/components/layouts/public-payout';
import React from 'react'


type Props = {
    children: React.ReactNode;
}
const PresentationLayout = ({children}: Props) => {
  return (
    <PublicLayout>
 {children}
    </PublicLayout>
     
    
  )
}

export default PresentationLayout
