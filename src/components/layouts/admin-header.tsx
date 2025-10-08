'use client';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-gray-700 bg-gray-950 px-6 sticky top-0 z-30">
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
      >
        <MenuIcon className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <div className="flex-1">
        {/* Can add a search bar or other header content here */}
      </div>
    </header>
  );
};

export default AdminHeader;