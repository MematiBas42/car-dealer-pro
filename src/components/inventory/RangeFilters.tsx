import React, { useEffect, useState } from "react";
import { FilterOptions, TaxonomyFiltersProps } from "@/config/types";
import { CurrencyCode } from "@prisma/client";
import RangeSelect from "../ui/RangeSelect";
import { stat } from "fs";

interface RangeFiltersProps extends TaxonomyFiltersProps {
  label: string;
  minName: string;
  maxName: string;
  defaultMin: number;
  defaultMax: number;
  increment?: number;
  thousandsSeparator?: boolean;
  currency?: {
    currencyCode: CurrencyCode;
  };
}
const RangeFilters = ({
  label,
  minName,
  maxName,
  defaultMin,
  defaultMax,
  increment,
  thousandsSeparator,
  currency,
  handleChange,
  searchParams,
}: RangeFiltersProps) => {
  const getInitialState = () => {
    const state: FilterOptions<string, number> = [];
    let iterator = defaultMin - (increment ?? 1);
    do {
      if (increment) {
        iterator += increment;
      } else {
        iterator++;
      }

      state.push({
        label: iterator.toString(),
        value: iterator,
      });
    } while (iterator <= Number(defaultMax));
    return state;
  };

  const initialState = getInitialState();

  const [minOptions, setMinOptions] =
    useState<FilterOptions<string, number>>(initialState);
  const [maxOptions, setMaxOptions] = useState<FilterOptions<string, number>>(
    initialState.toReversed()
  );

  // biome-ignore lint:
  useEffect(() => {
    if (searchParams?.[minName]) {
      setMaxOptions(
        initialState.filter(
          ({ value }) => value > Number(searchParams[minName])
        )
      );
    }
    if (searchParams?.[maxName]) {
      setMinOptions(
        initialState.filter(
          ({ value }) => value < Number(searchParams[maxName])
        )
      );
    }
  }, [searchParams?.[minName], searchParams?.[maxName]]);

  // Helper function to safely convert searchParams to number
  const getParamValue = (paramName: string): number | "" => {
    const paramValue = searchParams?.[paramName];
    if (!paramValue) return "";
    const numValue = Number(paramValue);
    return isNaN(numValue) ? "" : numValue;
  };
  return (
    <RangeSelect
      label={label}
      minSelect={{
        name: minName,
        value: getParamValue(minName),
        onChange: handleChange,
        options: minOptions,
      }}
      maxSelect={{
        name: maxName,
        value: getParamValue(maxName),
        onChange: handleChange,
        options: maxOptions,
      }}
    />
  );
};

export default RangeFilters;
