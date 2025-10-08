import { getCars } from "@/app/_actions/car";
import { AdminCarFilterSchema } from "@/app/schemas/table-filter.schema";
import {
  CarsTableSortSchema,
  type CarsTableSortType,
  validateSortOrder,
} from "@/app/schemas/table-sort.schema";
import CarTableHeader from "@/components/car/CarTableHeader";
import CarsTableRow, { CarMobileCard } from "@/components/car/car-table-row";
import CarManageHeader from "@/components/admin/cars/cars-header";
import { AdminTableFooter } from "@/components/shared/admin-table-footer";
import { Table, TableBody, TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { routes } from "@/config/routes";
import type { CarKeys, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { validatePagination } from "@/lib/utils";

export default async function CarsPage(props: PageProps) {
    const searchParams = await props.searchParams;

    const { page, itemsPerPage } = validatePagination({
      page: (searchParams?.page as string) || "1",
      itemsPerPage: (searchParams?.itemsPerPage as "10") || "10",
    });

    const { sort, order } = validateSortOrder<CarsTableSortType>({
      sort: searchParams?.sort as CarKeys,
      order: searchParams?.order as "asc" | "desc",
      schema: CarsTableSortSchema,
    });

    const offset = (Number(page) - 1) * Number(itemsPerPage);

    const { data, error } = AdminCarFilterSchema.safeParse(searchParams);

    if (error) console.log("Validation error: ", error);

    const where = {
        ...(data?.q && { title: { contains: data.q, mode: "insensitive" } }),
        ...(data?.status && data.status !== "ALL" && { status: data.status }),
    }

    const cars = await prisma.classified.findMany({
      where,
      orderBy: { [sort as string]: order as "asc" | "desc" },
      include: { images: true },
      skip: offset,
      take: Number(itemsPerPage),
    });

    const count = await prisma.classified.count({
      where
   });

    const totalPages = Math.ceil(count / Number(itemsPerPage));

    return (
      <>
        <CarManageHeader searchParams={searchParams} />

        {/* Desktop Table View */}
        <div className="hidden md:block border rounded-lg">
            <Table>
                <CarTableHeader
                    sort={sort as CarKeys}
                    order={order as "asc" | "desc"}
                />
                <TableBody>
                    {cars.map((car) => (
                        <CarsTableRow
                        key={car.id}
                        car={car}/>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="border-b-0 hover:bg-transparent">
                        <TableCell colSpan={10} className="bg-sky-200 rounded-b-lg">
                            <AdminTableFooter
                                baseURL={routes.admin.cars}
                                searchParams={searchParams}
                                disabled={!cars.length}
                                totalPages={totalPages}
                            />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
            {cars.map((car) => (
                <CarMobileCard key={car.id} car={car} />
            ))}
            <div className="p-4 bg-sky-200 rounded-lg">
                <AdminTableFooter
                    baseURL={routes.admin.cars}
                    searchParams={searchParams}
                    disabled={!cars.length}
                    totalPages={totalPages}
                />
            </div>
        </div>
      </>
    );
}