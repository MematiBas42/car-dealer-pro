import { Variants } from 'framer-motion'
import React, { useCallback, useState } from 'react'

const AdminSidebar = () => {
    const [isSidebarexpanded, setIsSidebarexpanded] = useState(false)
    const handleSideHover = useCallback((expanded: boolean) => {
        setIsSidebarexpanded(expanded)
    },[])
    const sidebarVariants: Variants = {
		expanded: { width: 256 },
		collapsed: { width: "fit-content" },
	};

	const menuTextVariants: Variants = {
		expanded: {
			opacity: 1,
			width: "auto",
			marginLeft: 10,
		},
		collapsed: { opacity: 0, width: 0 },
	};

	const logoVariants: Variants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};
  return (
    <div>
      
    </div>
  )
}

export default AdminSidebar
