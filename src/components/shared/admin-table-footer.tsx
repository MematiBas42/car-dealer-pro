'use client';
import { AwaitedPageProps } from "@/config/types";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface AdminTableFooterProps extends AwaitedPageProps {
  baseURL: string;
  totalPages: number;
  disabled: boolean;
}

export const AdminTableFooter = (props: AdminTableFooterProps) => {
  const { baseURL, searchParams, totalPages, disabled } = props;
  const router = useRouter();
  const page = Number(searchParams?.page) || 1;

  const buildURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set("page", pageNumber.toString());
    router.push(`${baseURL}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-sm text-black font-medium">
        Page {page} of {totalPages}
      </span>
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