import HomepageTaxonomyFilters from "@/components/homepage/homepage-filter";
import { Button } from "@/components/ui/button";
import { imageSources } from "@/config/constants";
import { PageProps } from "@/config/types";
import { imgixLoader } from "@/lib/imgix-loader";
import Image from "next/image";
import Link from "next/link";
import { ClassifiedStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;
  const minMaxResult = await prisma.classified.aggregate({
		where: { status: ClassifiedStatus.LIVE },
		_min: {
			year: true,
			price: true,
			odoReading: true,
		},
		_max: {
			price: true,
			year: true,
			odoReading: true,
		},
	});
  return (
    <div className="w-full min-h-screen bg-background">
      <section
        className="relative flex items-center justify-center h-[calc(100vh-4rem)] bg-cover bg-center"
        style={{
          backgroundImage: `url(${imgixLoader({ src: imageSources.carLineup, width: 1280, quality: 100 })})`,
        }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-75" />
        <div className="container lg:grid space-y-12 grid-cols-2 items-center relative z-10">
          <div className="px-10 lg:px-0">
            <h1
              className="text-2xl text-center lg:text-left md:text-4xl lg:text-8xl uppercase
             font-bold text-white"
            >
              STRAIGHT FIRE WHIPS AT CRAZY PRICES
            </h1>
            <h2 className="mt-4 uppercase text-center lg:text-left text-base md:text-3xl lg:text-4xl text-white">
              GET YOUR RIDE OR DIE TODAY
            </h2>
          </div>
          <div
            className="max-w-md w-full mx-auto p-6 bg-white 
          sm:rounded-xl shadow-lg"
          >
            <div className="space-y-4">
              <div className="space-y-2 flex flex-col w-full gap-x-4">
                <HomepageTaxonomyFilters
                  searchParams={searchParams}
                  minMaxValue={minMaxResult}
                />
              </div>
              <Button className="w-full" asChild>
                <Link href={""}>Search</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
