import ChallengeEmail from "@/emails/challenge";
import { bcryptPasswordHash } from "./brypt";
import { redis } from "./redis-store";
import { resend } from "./resend";

const REDIS_PREFIX = 'otp';

// issue new 2fa for user and sends them the code 
// if there is an outstanding 2fa challenge for the user, it just resend the code 

export async function issueChallenge(userId: string, email: string) {
    const array = new Uint32Array(1);
    const code = (crypto.getRandomValues(array)[0] % 900000) + 100000; // Generate a 6-digit code
    const hash = await bcryptPasswordHash(code.toString());
    const challenge = {
        codeHash: hash,
        email,
    }

    await redis.setex(`${REDIS_PREFIX}:uid-${userId}`, 60 * 60, challenge)
    const {error} = await resend.emails.send({
        from : "ducthai060501@gmail.com",
        to: email,
        subject: "Your OTP Code",
        html: `<p>${code}</p>`,
        react:ChallengeEmail({
            data: {code}
        }),
    }) 

    if (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send OTP email");
    }
} 