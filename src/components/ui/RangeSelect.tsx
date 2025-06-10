"use client";
import { FilterOptions } from "@/config/types";
import React, { SelectHTMLAttributes } from "react";

interface SelectType extends SelectHTMLAttributes<HTMLSelectElement> {
	options: FilterOptions<string, number>;
    value: number | string | "";
}
interface RangeSelectProps {
  label: string;
  minSelect: SelectType;
  maxSelect: SelectType;
}
const RangeSelect = ({ label, minSelect, maxSelect }: RangeSelectProps) => {
  return (
    <>
			<h4 className="text-sm font-semibold">{label}</h4>
			<div className="!mt-1 flex gap-2">
				<select
					{...minSelect}
                    value={minSelect.value || ""}
					className="flex-1 w-full pl-3 py-2 border rounded-md custom-select appearance-none pr-12 bg-no-repeat"
				>
					<option value="">Select</option>
					{minSelect.options.map((option) => {
						return (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						);
					})}
				</select>
				<select
					{...maxSelect}
                    value={maxSelect.value || ""}
					className="flex-1 w-full pl-3 py-2 border rounded-md custom-select appearance-none pr-12 bg-no-repeat"
				>
					<option value="">Select</option>
					{maxSelect.options.map((option) => {
						return (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						);
					})}
				</select>
			</div>
		</>
  );
};

export default RangeSelect;
