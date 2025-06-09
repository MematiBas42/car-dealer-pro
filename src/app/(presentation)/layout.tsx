import React from 'react'


type Props = {
    children: React.ReactNode;
}
const PresentationLayout = ({children}: Props) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default PresentationLayout
