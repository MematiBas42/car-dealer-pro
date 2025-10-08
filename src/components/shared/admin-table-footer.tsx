'use client';
import { AwaitedPageProps } from "@/config/types";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Select } from "../ui/select";
import { ChangeEvent } from "react";

interface AdminTableFooterProps extends AwaitedPageProps {
  baseURL: string;
  totalPages: number;
  disabled: boolean;
}

const itemsPerPageOptions = ["10", "25", "50", "100"];

export const AdminTableFooter = (props: AdminTableFooterProps) => {
  const { baseURL, searchParams, totalPages, disabled } = props;
  const router = useRouter();
  const page = Number(searchParams?.page) || 1;
  const itemsPerPage = searchParams?.itemsPerPage || '10';

  const buildURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set("page", pageNumber.toString());
    router.push(`${baseURL}?${params.toString()}`);
  };

  const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set("itemsPerPage", e.target.value);
    params.set("page", "1"); // Reset to page 1
    router.push(`${baseURL}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-4">
            <span className="text-sm text-black font-medium">
                Page {page} of {totalPages}
            </span>
            <Select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                options={itemsPerPageOptions.map(item => ({ label: `Show ${item}`, value: item }))}
                noDefault={true}
                className="bg-transparent text-black border-black/50 focus:ring-0 focus:outline-none"
            />
        </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent text-black border-black/50 hover:bg-black/10"
          disabled={page <= 1 || disabled}
          onClick={() => buildURL(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent text-black border-black/50 hover:bg-black/10"
          disabled={page >= totalPages || disabled}
          onClick={() => buildURL(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
