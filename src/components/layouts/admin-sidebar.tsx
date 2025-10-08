'use client';
import { routes } from "@/config/routes";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CarFrontIcon, LayoutDashboardIcon, SettingsIcon, UsersIcon, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ActiveLink from "../ui/active-link";

const navigation = [
  { name: "Dashboard", href: routes.admin.dashboard, icon: LayoutDashboardIcon },
  { name: "Cars", href: routes.admin.cars, icon: CarFrontIcon },
  { name: "Customers", href: routes.admin.customers, icon: UsersIcon },
  { name: "Settings", href: routes.admin.settings, icon: SettingsIcon },
];

// This is the content that will be shared between desktop and mobile
export const AdminSidebarContent = ({ onLinkClick }: { onLinkClick?: () => void }) => (
      <div className="flex flex-col h-full bg-gray-950 text-white">
          <div className="p-4 border-b border-gray-800 flex justify-center h-[69px] items-center">
               <Link href={routes.home} onClick={onLinkClick}>
                  <Image src="/assets/logo.png" alt="RIM GLOBAL Logo" width={160} height={50} className="object-contain" />
              </Link>
          </div>
          <nav className="flex-grow p-4 space-y-2">
              {navigation.map((item) => (
              <ActiveLink
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-lg transition-colors duration-200"
                  onClick={onLinkClick}
              >
                  <item.icon aria-hidden="true" className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>{item.name}</span>
              </ActiveLink>
              ))}
          </nav>
          <div className="border-t border-gray-800 p-4">
              <Link href={routes.home} onClick={onLinkClick} className="flex items-center p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
                  <ArrowLeft className="h-6 w-6 mr-3" />
                  <span>Return to Site</span>
              </Link>
          </div>
      </div>
  );

// This is the desktop-only animated sidebar
const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sidebarVariants: Variants = {
    expanded: { width: 256 },
    collapsed: { width: 72 },
  };

  const navItemVariants: Variants = {
    expanded: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.3 } },
    collapsed: { opacity: 0, x: -15, transition: { duration: 0.2 } },
  };

  return (
    <motion.aside
      className="hidden md:flex flex-col h-screen sticky top-0 bg-gray-950 z-10 shadow-lg"
      variants={sidebarVariants}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
    >
        <div className="p-4 border-b border-gray-800 flex items-center justify-center h-[69px] flex-shrink-0 overflow-hidden">
             <Link href={routes.home}>
                <AnimatePresence mode="wait">
                    {isExpanded ? (
                        <motion.div key="full-logo" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -20}} transition={{duration: 0.3, delay: 0.1}}>
                            <Image src="/assets/logo.png" alt="RIM GLOBAL Logo" width={160} height={50} />
                        </motion.div>
                    ) : (
                        <motion.div key="icon-logo" initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}} transition={{duration: 0.2}}>
                            <Image src="/window.svg" alt="Icon Logo" width={32} height={32} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Link>
        </div>
        <nav className="flex-grow p-2 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
            <ActiveLink
                key={item.name}
                href={item.href}
                className="flex items-center p-3 rounded-lg transition-colors duration-200"
            >
                <item.icon aria-hidden="true" className="h-6 w-6 flex-shrink-0" />
                <motion.span
                    variants={navItemVariants}
                    className="ml-3 whitespace-nowrap overflow-hidden"
                >
                    {item.name}
                </motion.span>
            </ActiveLink>
            ))}
        </nav>
        <div className="border-t border-gray-800 p-2 flex-shrink-0">
            <Link href={routes.home} className="flex items-center p-3 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
              <motion.div variants={navItemVariants} className="flex items-center overflow-hidden w-full">
                    <ArrowLeft className="h-6 w-6 flex-shrink-0" />
                    <span className="ml-3 whitespace-nowrap">Return to Site</span>
                </motion.div>
            </Link>
        </div>
    </motion.aside>
  );
};

export default AdminSidebar;