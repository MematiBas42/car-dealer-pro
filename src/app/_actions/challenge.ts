"use server";

import { issueChallenge } from "@/lib/otp";
import { auth } from "../../../auth";

export const resendChallengeAction = async () => {
    const session = await auth();

    if (!session?.user) {
        return {
            success: false,
            message: "User not authenticated",
        }
    }
    await issueChallenge(session.user.id as string, session.user.email as string);

    return {
        success: true,
        message: "Code sent successfully",
    }
}