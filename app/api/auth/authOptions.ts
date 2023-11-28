import prisma from "@/prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const AuthOptions: NextAuthOptions =
{
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;
                const user = await prisma.user.findUnique({ where: { email: credentials.email } });

                if(!user) return null;
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword!);
                return passwordMatch? user : null;
            },
            
        }),
    ],
    session: { strategy: "jwt" },
  
}

