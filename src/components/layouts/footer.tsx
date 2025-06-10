import { routes } from "@/config/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const socialLinks = [
    { id: 1, link: "https://facebook.com" },
    { id: 2, link: "https://twitter.com" },
    { id: 3, link: "https://instagram.com" },
    { id: 4, link: "https://linkedin.com" },
    { id: 5, link: "https://youtube.com" }
]

const PublicFooter = () => {
  return (
    <footer className="bg-gray-100 px-8 lg:px-0 py-8">
      <div
        className="container mx-atuo grid grid-cols-1 md:grid-cols-3
    gap-8 "
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Link className=" flex items-center" href={routes.home}>
              <Image
                src="/logo.svg"
                alt="Logo"
                width={300}
                height={300}
                className="j-8 relative"
              />
            </Link>
          </div>
          <div className="flex space-y-4"></div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
