'use client';
import { AwaitedPageProps } from "@/config/types";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RadioFilterProps extends AwaitedPageProps {
  items: string[];
}

const RadioFilter = ({ searchParams, items }: RadioFilterProps) => {
  const router = useRouter();
  const currentStatus = (searchParams?.status as string) || "ALL";

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(window.location.search);
    if (status.toUpperCase() === "ALL") {
      params.delete("status");
    } else {
      params.set("status", status.toUpperCase());
    }
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <>
      {/* Desktop View: Radio Buttons */}
      <div className="hidden md:flex items-center gap-2 rounded-lg border border-gray-700 p-1">
        {items.map((item) => (
          <Button
            key={item}
            variant="ghost"
            onClick={() => handleStatusChange(item)}
            className={cn(
              "px-3 py-1 h-8 text-sm",
              currentStatus.toLowerCase() === item.toLowerCase()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "hover:bg-gray-800"
            )}
          >
            {item}
          </Button>
        ))}
      </div>

      {/* Mobile View: Dropdown Menu */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 border-blue-500">
              Status: {currentStatus}
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700 text-white">
            <DropdownMenuRadioGroup value={currentStatus} onValueChange={handleStatusChange}>
              {items.map((item) => (
                <DropdownMenuRadioItem key={item} value={item} className="focus:bg-blue-600/50 focus:text-white">
                  {item}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default RadioFilter;
