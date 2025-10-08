import { getCustomers } from "@/app/_actions/customer";
import {
  AdminCustomerFilterSchema,
} from "@/app/schemas/table-filter.schema";
import {
  CustomersTableSortSchema,
  CustomerKeys,
  validateSortOrder,
} from "@/app/schemas/table-sort.schema";
import { AdminCustomersHeader } from "@/components/admin/customers/customers-header";
import { CustomersTableHeader } from "@/components/admin/customers/customers-table-header";
import {
  CustomerTableRow,
  CustomerMobileCard,
} from "@/components/admin/customers/customers-table-rows";
import { AdminTableFooter } from "@/components/shared/admin-table-footer";
import { Table, TableBody, TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { routes } from "@/config/routes";
import { PageProps } from "@/config/types";
import { validatePagination } from "@/lib/utils";

const CustomersPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;

  const { page, itemsPerPage } = validatePagination({
    page: (searchParams?.page as string) || "1",
    itemsPerPage: (searchParams?.itemsPerPage as "10") || "10",
  });

  const { sort, order } = validateSortOrder<CustomerKeys>({
    sort: searchParams?.sort as CustomerKeys,
    order: searchParams?.order as "asc" | "desc",
    schema: CustomersTableSortSchema,
  });

  const { data, error } = AdminCustomerFilterSchema.safeParse(searchParams);
  if (error) {
    console.log(error);
  }

  const { customers, totalPages } = await getCustomers({
    page,
    itemsPerPage,
    sort,
    order,
    query: data?.q,
    status: data?.status,
  });

  if (!customers) {
    return <div>No customers found</div>;
  }

  return (
    <>
      <AdminCustomersHeader searchParams={searchParams} />
        {/* Desktop Table View */}
        <div className="hidden md:block border rounded-lg">
            <Table>
                <CustomersTableHeader
                    sort={sort as CustomerKeys}
                    order={order as "asc" | "desc"}
                />
                <TableBody>
                {customers.map((customer) => (
                <CustomerTableRow key={customer.id} {...customer} />
                ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="border-b-0 hover:bg-transparent">
                        <TableCell colSpan={10} className="bg-sky-200 rounded-b-lg">
                            <AdminTableFooter
                                baseURL={routes.admin.customers}
                                searchParams={searchParams}
                                disabled={!customers.length}
                                totalPages={totalPages}
                            />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {customers.map((customer) => (
          <CustomerMobileCard key={customer.id} {...customer} />
        ))}
        <div className="p-4 bg-sky-200 rounded-lg">
            <AdminTableFooter
                baseURL={routes.admin.customers}
                searchParams={searchParams}
                disabled={!customers.length}
                totalPages={totalPages}
            />
        </div>
      </div>
    </>
  );
};

export default CustomersPage;