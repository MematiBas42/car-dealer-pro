import { validatePagination } from "@/app/schemas/pagination.schema";
import CarManageHeader from "@/components/admin/cars/cars-header";
import { PageProps } from "@/config/types";
import React from "react";

const CarsPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const { page, itemsPerPage } = validatePagination({
    page: (searchParams?.page as string) || "1",
    itemsPerPage: (searchParams?.itemsPerPage as "10") || "10",
  });

  return (
    <>
      <CarManageHeader searchParams={searchParams} />
    </>
  );
};

export default CarsPage;
