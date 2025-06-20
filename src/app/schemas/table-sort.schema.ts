
import { stringMap } from "aws-sdk/clients/backup";
import { z } from "zod";


export const CarsTableSortSchema = z.object({
	order: z.enum(["asc", "desc"]).default("desc"),
	sort: z
		.enum([
			"status",
			"title",
			"vrm",
			"id",
			"views",
			"year",
			"colour",
			"price",
			"createdAt",
		])
		.default("createdAt"),
});

export type CarsTableSortType = z.infer<
	typeof CarsTableSortSchema
>;

interface ValidateSortOrderArgs<TSchemaType>  {
    sort: string;
    order: string;
    schema: TSchemaType extends CarsTableSortType ? typeof CarsTableSortSchema 
    : typeof CarsTableSortSchema;

}
export function validateSortOrder<TSchemaType>(
    args: ValidateSortOrderArgs<TSchemaType>
) {
    const { sort, order, schema } = args;
    const { data, success, error } = schema.safeParse({
        sort,
        order,
    })

    if (error) console.log("Validation error: ", error);

    if (!success) {
        return {
            sort: undefined, 
            order: undefined
        }
    }

    return data;
}