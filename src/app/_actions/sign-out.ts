"use server";
import { auth, signOut } from "@/auth";
import { routes } from "@/config/routes";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
export const signOutAction = async () => {
    const session = await auth();
	if (session) {
		await signOut({
			redirect: true,
			redirectTo: routes.signIn,
		});
	}
}