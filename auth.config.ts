import { NextAuthConfig, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "@auth/core/providers/credentials";
import ResendProvider from "@auth/core/providers/resend";
import { z } from "zod";
import { bcryptPasswordCompare } from "@/lib/brypt";
import { routes } from "@/config/routes";
import { Rocket } from "lucide-react";
import { SESSION_MAX_AGE } from "@/config/constants"; // 30 days in seconds
import { AdapterUser } from "@auth/core/adapters";
const SignInSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address")
    .trim()
    .toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export const config = {
  adapter: PrismaAdapter(prisma),
  useSecureCookies: false,
  trustHost: true,
  session: {
    strategy: "database",
    maxAge: SESSION_MAX_AGE / 1000,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const validatedFields = SignInSchema.safeParse(credentials);
          if (!validatedFields.success) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: validatedFields.data.email,
            },
            select: {
              hashedPassword: true,
            },
          });

          if (!user) {
            return null;
          }

          const match = bcryptPasswordCompare(
            validatedFields.data.password,
            user.hashedPassword
          );

          if (!match) {
            return null;
          }

          // issue a challenge to the user
          return {
            ...user,
            requires2FA: true,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: routes.signIn,
    signOut: "/auth/sign-out",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      const session = await prisma.session.create({
        data: {
          expires: new Date(Date.now() + SESSION_MAX_AGE),
          // sessionToken: crypto.randomUUID(),
          sessionId: crypto.randomUUID(),
          userId: user.id as string,
          requireF2A: user.requires2FA,
        },
      });

      if (!session) {
        return null;
      }
      if (user) {
        token.requires2FA = user.requires2FA;
      }
      token.id = session.sessionId;
      token.exp = session.expires.getTime() / 1000; // Convert to seconds

      return token;
    },
    async session({ session, user }) {
      session.user = {
        id: session.userId,
        email: user.email,
      } as AdapterUser;
      return session;
    },
  },
  jwt: {
    encode: async ({ token }) => token?.id as string,
  },
} satisfies NextAuthConfig;
