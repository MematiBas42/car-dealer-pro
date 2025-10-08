'use client';
import React from "react";
import { CarWithImages } from "@/config/types";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { formatCarStatus, formatColour, formatPrice } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { CarBadgeMap } from "@/config/constants";
import { format, formatDistanceToNow } from "date-fns";
import ActionButtons from "./ActionButtons";

// New component for the mobile card view
export const CarMobileCard = ({ car }: { car: CarWithImages }) => (
    <div className="md:hidden p-4 mb-4 bg-gray-900/70 border border-gray-700 rounded-lg space-y-4">
        <div className="flex items-start gap-4">
            <Image
                src={car.images?.[0]?.src || "/placeholder.png"}
                alt={car.images?.[0]?.alt || "Car Image"}
                width={120}
                height={90}
                className="aspect-video object-cover rounded-lg"
            />
            <div className="flex-grow space-y-1">
                <p className="text-lg font-semibold text-white line-clamp-2">{car.title}</p>
                <p className="text-xl font-bold text-primary">
                {formatPrice({ price: car.price, currency: car.currency || "EUR" })}
                </p>
            </div>
            <Badge variant={CarBadgeMap[car.status]} className="h-fit">{formatCarStatus(car.status)}</Badge>
        </div>
        
        <div className="border-t border-gray-700 pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-gray-400">VRM:</span>
                <span className="font-medium text-white">{car.vrm || "N/A"}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-400">Views:</span>
                <span className="font-medium text-white">{car.views}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-400">Created:</span>
                <span className="font-medium text-white">{formatDistanceToNow(car.createdAt, { addSuffix: true })}</span>
            </div>
        </div>

        <div className="flex justify-end pt-3">
            <ActionButtons car={car} />
        </div>
    </div>
);

// Original component now only renders the table row for desktop
const CarsTableRow = ({ car }: { car: CarWithImages }) => {
  return (
    <TableRow className="hidden md:table-row text-gray-400 border-gray-800">
      <TableCell className="font-medium">{car.id}</TableCell>
      <TableCell className="p-1">
		<Image
		  src={car.images?.[0]?.src || "/placeholder.png"}
		  alt={car.images?.[0]?.alt || "Car Image"}
		  width={100}
		  height={75}
		  className="aspect-video object-cover rounded-md"
        />
      </TableCell>
      <TableCell>{car.title}</TableCell>
      <TableCell>
        {formatPrice({
          price: car.price,
          currency: car.currency || "EUR",
        })}
      </TableCell>
      <TableCell>{car.vrm}</TableCell>
      <TableCell>
        {formatColour(car.colour)}
      </TableCell>
      <TableCell>
        <Badge variant={CarBadgeMap[car.status]}>
          {formatCarStatus(car.status)}
        </Badge>
      </TableCell>
        <TableCell className="hidden md:table-cell">
            {format(car.createdAt, "dd/MM/yyyy")}
        </TableCell>
        <TableCell>
            {car.views}
        </TableCell>
        <TableCell className="text-right">
            <ActionButtons
                car={car}
                />
        </TableCell>
    </TableRow>
  );
};

export default CarsTableRow;
