'use client';
import { routes } from "@/config/routes";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CarFrontIcon, LayoutDashboardIcon, SettingsIcon, UsersIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ActiveLink from "../ui/active-link";
import { Button } from "../ui/button";

const navigation = [
  { name: "Dashboard", href: routes.admin.dashboard, icon: LayoutDashboardIcon },
  { name: "Cars", href: routes.admin.cars, icon: CarFrontIcon },
  { name: "Customers", href: routes.admin.customers, icon: UsersIcon },
  { name: "Settings", href: routes.admin.settings, icon: SettingsIcon },
];

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const sidebarVariants: Variants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-4 z-50 md:relative md:w-auto md:h-auto md:bg-transparent md:p-0 md:z-auto"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 md:hidden">
            <span className="text-lg font-bold">Admin Menu</span>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <XIcon className="h-6 w-6" />
            </Button>
          </div>
          <Link href={routes.home} className="mb-6 hidden md:block">
            <Image src="/logo.svg" alt="Logo" width={150} height={40} />
          </Link>
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <ActiveLink
                key={item.name}
                href={item.href}
                className="flex items-center p-2 rounded-lg transition-colors duration-200"
              >
                <item.icon aria-hidden="true" className="h-6 w-6 mr-3" />
                <span>{item.name}</span>
              </ActiveLink>
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default AdminSidebar;