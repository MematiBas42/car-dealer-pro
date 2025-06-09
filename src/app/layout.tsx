import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Mulish, Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { cn } from "@/lib/utils";
const mulish = Mulish({
	weight: "variable",
	subsets: ["latin"],
	variable: "--font-heading",
	display: "swap",
});

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-body",
	display: "swap",
});
export const metadata: Metadata = {
  title: "Car dealership",
  description: "A car dealership website built with Next.js and Nuqs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
				className={cn(
					"antialiased overscroll-none bg-background font-heading",
					roboto.variable,
					mulish.variable,
				)}
			>
        <NextTopLoader showSpinner={true} />
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}
