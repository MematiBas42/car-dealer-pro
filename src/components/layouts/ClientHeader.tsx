'use client';
import { routes } from "@/config/routes";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { HeartIcon, HomeIcon, LayoutDashboard, MoonIcon, SearchIcon, SunIcon } from "lucide-react";
import { Favourites } from "@/config/types";
import { usePathname } from "next/navigation";
import { MobileNav } from "./mobile-nav";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useTheme } from "next-themes";
import SignoutForm from "../auth/SignoutForm";

const navLinks = [
  { id: 1, href: routes.inventory, label: "The Collection" },
  { id: 2, href: routes.financing, label: "Financing" },
  { id: 3, href: routes.ourPhilosophy, label: "Our Philosophy" },
  { id: 4, href: routes.contact, label: "Contact" },
];

interface ClientHeaderProps {
    session: any; // Simplified
    favs: Favourites | null;
}

const ClientHeader = ({ session, favs }: ClientHeaderProps) => {
  const pathname = usePathname();
  const favCount = favs?.ids.length || 0;
  const { setTheme } = useTheme();

  return (
    <header key={pathname} className="flex items-center justify-between h-16 px-4 bg-transparent gap-x-6">
      <div className="flex items-center flex-1 gap-x-4">
        <Link href={routes.home} className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="RIM GLOBAL Logo"
            width={60}
            height={60}
            className="relative"
          />
          <div>
            <span className="text-xl font-bold text-primary">RIM GLOBAL</span>
            <p className="text-sm text-muted-foreground text-right -mt-1">auto sales</p>
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-x-4">
        <Button asChild variant="outline" size="icon">
          <Link href={routes.home}>
            <HomeIcon className="w-6 h-6" />
          </Link>
        </Button>
        <Button variant="outline" size="icon">
          <SearchIcon className="w-6 h-6" />
        </Button>
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="px-4 py-2 text-sm uppercase font-medium text-foreground hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
        <Button asChild variant="outline" size="icon" className="relative">
          <Link href={routes.favourites}>
            <HeartIcon className="w-6 h-6" />
            <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 text-primary-foreground bg-primary rounded-full">
              <span className="text-xs">{favCount}</span>
            </div>
          </Link>
        </Button>

        {/* Theme and Auth Controls */}
        <div className="flex items-center gap-x-2 border-l border-border ml-2 pl-4">
            {session ? (
                <div className="flex items-center gap-x-2">
                    <Button asChild variant="outline" size="icon">
                        <Link href={routes.admin.dashboard}>
                            <LayoutDashboard className="h-5 w-5" />
                        </Link>
                    </Button>
                    <SignoutForm />
                </div>
            ) : (
                <Button asChild>
                    <Link href={routes.signIn}>Login</Link>
                </Button>
            )}
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
        </div>
      </nav>

      {/* Mobile Navigation Trigger */}
      <div className="md:hidden">
        <MobileNav isLoggedIn={!!session} favCount={favCount} />
      </div>
    </header>
  );
};

export default ClientHeader;
