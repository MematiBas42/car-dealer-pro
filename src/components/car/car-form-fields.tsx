"use client";

import {
  formatBodyType,
  formatColour,
  formatFuelType,
  formatTransmission,
  generateYears,
} from "@/lib/utils";
import {
  BodyType,
  Colour,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from "@prisma/client";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { Select } from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import TaxonomySelect from "./TaxonomySelect";

const years = generateYears(1925);
const CarFormField = () => {
  const form = useFormContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted">
      <FormField
        control={form.control}
        name="year"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="year">Year</FormLabel>
            <FormControl>
              <Select
                selectClassName="text-gray-500 bg-gray-800 border-transparent"
                options={years.map((year) => ({
                  label: year,
                  value: year,
                }))}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <TaxonomySelect/>
    </div>
  );
};

export default CarFormField;
