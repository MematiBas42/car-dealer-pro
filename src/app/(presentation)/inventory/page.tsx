import CarCard from "@/components/inventory/car-card";
import CarsList from "@/components/inventory/cars-list";
import Sidebar from "@/components/inventory/sidebar";
import CustomPagination from "@/components/shared/custom-pagination";
import { CARS_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/routes";
import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { ClassifiedStatus, Prisma } from "@prisma/client";
import React from "react";
import { z } from "zod";

const CarFilterSchema = z.object({
  q: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  modelVariant: z.string().optional(),
  minYear: z.string().optional(),
  maxYear: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minReading: z.string().optional(),
  maxReading: z.string().optional(),
  currency: z.string().optional(),
  odoUnit: z.string().optional(),
  transmission: z.string().optional(),
  fuelType: z.string().optional(),
  bodyType: z.string().optional(),
  colour: z.string().optional(),
  doors: z.string().optional(),
  seats: z.string().optional(),
  ulezCompliance: z.string().optional(),
});
export const buildClassifiedFilterQuery = (
	searchParams: AwaitedPageProps["searchParams"] | undefined,
): Prisma.ClassifiedWhereInput => {
	const { data } = CarFilterSchema.safeParse(searchParams);

	if (!data) return { status: ClassifiedStatus.LIVE };

	const keys = Object.keys(data);

	const taxonomyFilters = ["make", "model", "modelVariant"];

	const rangeFilters = {
		minYear: "year",
		maxYear: "year",
		minPrice: "price",
		maxPrice: "price",
		minReading: "odoReading",
		maxReading: "odoReading",
	};

	const numFilters = ["seats", "doors"];
	const enumFilters = [
		"odoUnit",
		"currency",
		"transmission",
		"bodyType",
		"fuelType",
		"colour",
		"ulezCompliance",
	];

	const mapParamsToFields = keys.reduce(
		(acc, key) => {
			const value = searchParams?.[key] as string | undefined;
			if (!value) return acc;

			if (taxonomyFilters.includes(key)) {
				acc[key] = { id: Number(value) };
			} else if (enumFilters.includes(key)) {
				acc[key] = value.toUpperCase();
			} else if (numFilters.includes(key)) {
				acc[key] = Number(value);
			} else if (key in rangeFilters) {
				const field = rangeFilters[key as keyof typeof rangeFilters];
				acc[field] = acc[field] || {};
				if (key.startsWith("min")) {
					acc[field].gte = Number(value);
				} else if (key.startsWith("max")) {
					acc[field].lte = Number(value);
				}
			}

			return acc;
		},
		{} as { [key: string]: any },
	);

	return {
		status: ClassifiedStatus.LIVE,
		...(searchParams?.q && {
			OR: [
				{
					title: {
						contains: searchParams.q as string,
						mode: "insensitive",
					},
				},

				{
					description: {
						contains: searchParams.q as string,
						mode: "insensitive",
					},
				},
			],
		}),
		...mapParamsToFields,
	};
};
const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  const validPage = z
    .string()
    .transform((value) => Math.max(Number(value), 1))
    .optional()
    .parse(searchParams?.page);

  // getthe current page from search params, default to 1
  const page = validPage ? validPage : 1;

  // cal the offset for pagination
  const offset = (page - 1) * CARS_PER_PAGE;
  
  return prisma.classified.findMany({
    where: buildClassifiedFilterQuery(searchParams),
    include: {
      images: {
        take: 1, // only take the first image
      },
    },
    skip: offset,
    take: CARS_PER_PAGE,
  });
};

//   searchParams: AwaitedPageProps["searchParams"] | undefined
// ): Prisma.ClassifiedWhereInput => {
//   const data = CarFilterSchema.safeParse(searchParams);
//   if (!data) {
//     return {
//       status: ClassifiedStatus.LIVE,
//     };
//   }

//   const keys = Object.keys(data);
//   const taxonomyFilters = ["make", "model", "modelVariant"];
//   const mapParamsToFields = keys.reduce(
//     (acc, key) => {
//       const value = searchParams?.[key] as string | undefined;
//       if (!value) return acc;

//       if (taxonomyFilters.includes(key)) {
//         acc[key] = { id: Number(value) };
//       }

//       return acc;
//     },
//     {} as { [key: string]: any }
//   );

//   return {
//     status: ClassifiedStatus.LIVE,
//     ...(searchParams?.q && {
//       OR: [
//         { title: { contains: searchParams.q, mode: "insensitive" as const } },
//         {
//           description: {
//             contains: searchParams.q,
//             mode: "insensitive" as const,
//           },
//         },
//       ],
//     }),
//     ...mapParamsToFields,
//   };
// };

const InventoryPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const cars = await getInventory(searchParams);
 
  const count = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  });

  const minMaxresult = await prisma.classified.aggregate({
    where: {
      status: ClassifiedStatus.LIVE,
    },
    _min: {
      year: true,
    }, 
    _max: {
      price: true,
      year: true,
      odoReading: true,
    },
  })
  const sourceId = await getSourceId();
  const favs = await redis.get<Favourites>(sourceId ?? "");

  const totalPages = Math.ceil(count / CARS_PER_PAGE);
  return (
    <div className="flex">
      {/* <Sidebar/> */}
      <Sidebar minMaxValue={minMaxresult} searchParams={searchParams} />
      <div className="flex-1 p-4 bg-white">
        <div className="flex space-y-2 flex-col xl:flex-row items-center justify-center pb-4 -mt-1">
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
              paginationRoot: "justify-end lg:flex",
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
