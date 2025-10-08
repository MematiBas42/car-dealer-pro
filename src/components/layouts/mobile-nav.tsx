'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HomeIcon, MenuIcon, HeartIcon, SearchIcon, LayoutDashboard, LogOutIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { routes } from "@/config/routes";
import SignoutForm from "../auth/SignoutForm";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navLinks = [
  { id: 1, href: routes.inventory, label: "The Collection" },
  { id: 2, href: routes.financing, label: "Financing" },
  { id: 3, href: routes.ourPhilosophy, label: "Our Philosophy" },
  { id: 4, href: routes.contact, label: "Contact" },
];

interface MobileNavProps {
  isLoggedIn: boolean;
  favCount: number;
}

export function MobileNav({ isLoggedIn, favCount }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const pathname = usePathname();

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs bg-background p-4 flex flex-col">
        {/* Scrollable Content Area */}
        <div className="flex-grow overflow-y-auto">
          <nav className="grid gap-2">
            <Link href={routes.home} onClick={handleLinkClick} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 w-full", {
              "bg-muted text-primary": pathname === routes.home,
              "text-foreground hover:bg-muted": pathname !== routes.home
            })}>
              <HomeIcon className="h-5 w-5" />
              Home
            </Link>
            {navLinks.map((link) => (
              <Link key={link.id} href={link.href} onClick={handleLinkClick} className={cn("block rounded-lg px-3 py-2 text-base font-semibold leading-7 w-full", {
                "bg-muted text-primary": pathname === link.href,
                "text-foreground hover:bg-muted": pathname !== link.href
              })}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-border pt-4">
            <div className="grid gap-2">
              <Link href={routes.favourites} onClick={handleLinkClick} className={cn("flex items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 w-full", {
                "bg-muted text-primary": pathname === routes.favourites,
                "text-foreground hover:bg-muted": pathname !== routes.favourites
              })}>
                <div className="flex items-center gap-3">
                  <HeartIcon className="h-5 w-5 text-red-500" />
                  <span>Favourites</span>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                  {favCount}
                </div>
              </Link>
              <Link href="#" onClick={handleLinkClick} className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 w-full text-foreground hover:bg-muted">
                <SearchIcon className="h-5 w-5" />
                Search
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky Footer Area */}
        <div className="flex-shrink-0 border-t border-border pt-4 flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isLoggedIn && (
            <div className="flex items-center gap-2">
                <Link href={routes.admin.dashboard} passHref onClick={handleLinkClick}>
                    <Button variant="ghost" size="icon">
                        <LayoutDashboard className="h-5 w-5" />
                    </Button>
                </Link>
                <SignoutForm />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}