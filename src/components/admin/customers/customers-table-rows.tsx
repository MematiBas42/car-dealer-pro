'use client';
import React from "react";
import { CustomerWithCar } from "@/config/types";
import { TableCell, TableRow } from "../../ui/table";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CustomerBadgeMap } from "@/config/constants";
import { formatCustomerStatus } from "@/lib/utils";
import { CustomerActionButtons } from "./action-button";

export const CustomerTableRow = (customer: CustomerWithCar) => {
  return (
    <>
      {/* Desktop View: Standard Table Row */}
      <TableRow className="hidden md:table-row text-gray-400 border-gray-800">
        <TableCell className="font-medium">{customer.id}</TableCell>
        <TableCell>
          <Badge variant={CustomerBadgeMap[customer.status]}>
            {formatCustomerStatus(customer.status)}
          </Badge>
        </TableCell>
        <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
        <TableCell>{customer.email}</TableCell>
        <TableCell>{customer.mobile}</TableCell>
        <TableCell>{customer.carTitle || customer.classified?.title || "N/A"}</TableCell>
        <TableCell>{format(customer.updatedAt, "dd MMM yyyy")}</TableCell>
        <TableCell>{customer.bookingDate ? format(customer.bookingDate, "dd MMM yyyy") : "N/A"}</TableCell>
        <TableCell className="text-right">
          <CustomerActionButtons customer={customer} />
        </TableCell>
      </TableRow>

      {/* Mobile View: Card Layout */}
      <div className="md:hidden p-4 mb-4 bg-gray-900/70 border border-gray-700 rounded-lg space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-lg font-semibold text-white">{`${customer.firstName} ${customer.lastName}`}</p>
            <p className="text-sm text-gray-400">{customer.email}</p>
          </div>
          <Badge variant={CustomerBadgeMap[customer.status]}>
            {formatCustomerStatus(customer.status)}
          </Badge>
        </div>
        
        <div className="border-t border-gray-700 pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-gray-400">Interested In:</span>
                <span className="font-medium text-white">{customer.carTitle || customer.classified?.title || "N/A"}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-400">Mobile:</span>
                <span className="font-medium text-white">{customer.mobile || "N/A"}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-400">Booking Date:</span>
                <span className="font-medium text-white">{customer.bookingDate ? format(customer.bookingDate, "dd MMM yyyy") : "N/A"}</span>
            </div>
             <div className="flex justify-between">
                <span className="text-gray-400">Last Updated:</span>
                <span className="font-medium text-white">{formatDistanceToNow(customer.updatedAt, { addSuffix: true })}</span>
            </div>
        </div>

        <div className="flex justify-end pt-3">
            <CustomerActionButtons customer={customer} />
        </div>
      </div>
    </>
  );
};
