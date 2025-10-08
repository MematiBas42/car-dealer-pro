'use client';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { AdminSidebarContent } from "./admin-sidebar";
import { useState } from "react";

const AdminHeader = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="flex h-14 items-center gap-4 border-b border-gray-700 bg-gray-950 px-6 sticky top-0 z-30">
      {/* Mobile Sidebar Trigger */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden bg-gray-800 text-white hover:bg-gray-700 border-gray-600"
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-transparent border-0">
          <AdminSidebarContent onLinkClick={() => setIsSheetOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex-1">
        {/* Future content like search bar can go here */}
      </div>
    </header>
  );
};

export default AdminHeader;