"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateCustomerSchema,
  CreateCustomerType,
} from "../schemas/customer.schema";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/routes";

export const createCustomerAction = async (props: CreateCustomerType) => {
  try {
    const { data, success, error } = CreateCustomerSchema.safeParse(props);
    if (!success) {
      console.log("Validation failed", error);
      return {
        success: false,
        message: "Invalid data",
      };
    }
    if (data.terms !== "true") {
      return {
        success: false,
        message: "You must agree to the terms and conditions",
      };
    }

    const { date, terms,slug,  ...rest } = data;

    await prisma.customer.create({
      data: {
        ...rest,
        bookingDate: data.date,
        termsAccepted: terms === "true",
        classified: {
          connect: {
            slug: slug,
          },
        },
      },
    });
    return {
      success: true,
      message: "Customer has completed the booking",
    };
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};


export const deleteCustomerAction = async (id: number) => {
	try {
		await prisma.customer.delete({ where: { id } });
		revalidatePath(routes.admin.customers);
		return { success: true, message: "Customer deleted" };
	} catch (error) {
		console.log("Error deleting customer: ", { error });
		return {
			success: false,
			message: "Something went wrong deleting customer",
		};
	}
};