import CarCard from "@/components/inventory/car-card";
import CarsList from "@/components/inventory/cars-list";
import CustomPagination from "@/components/shared/custom-pagination";
import { OFFSET } from "@/config/constants";
import { routes } from "@/config/routes";
import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import React from "react";
import { z } from "zod";
const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  const validPage = z
    .string()
    .transform((value) => Math.max(Number(value), 1))
    .optional()
    .parse(searchParams?.page);

  // getthe current page from search params, default to 1
  const page = validPage ? validPage : 1;

  // cal the offset for pagination
  const offset = (page - 1) * OFFSET;

  return prisma.classified.findMany({
    where: {

    },
    include: {
      images: {
        take: 1, // only take the first image
      }
    },
    skip: offset,
    take: OFFSET,
  });
};

const InventoryPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const cars = await getInventory(searchParams);
  const count = await prisma.classified.count();
  const sourceId = await getSourceId();
  const favs = await redis.get<Favourites>(sourceId ?? "");

  const totalPages = Math.ceil(count / OFFSET);
  return (
    <div className="flex">
      {/* <Sidebar/> */}
      <div className="flex-1 p-4 bg-white">
        <div className="flex space-y-2 flex-col lg:flex-row items-center justify-center pb-4 -mt-1">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-sm md:text-base lg:text-xl font-semibold min-w-fit">
              {count} Cars Available
            </h2>
            {/* <DialogFilters/> */}
          </div>
          <CustomPagination
            baseURL={routes.inventory}
            totalPages={totalPages}
            styles={{
              paginationRoot: "justify-end lg:hidden pt-12",
              paginationPrevious: "",
              paginationNext: "",
              paginationLink: "border active:border",
              paginationLinkActive: "bg-sky-500 text-white",
            }}
          />
          <CarsList cars={cars} favourites={favs ? favs.ids : []} />
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
