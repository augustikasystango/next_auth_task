import { authorizeUser } from "@/lib/auth";
import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "email", type: "email", placeholder: "abc@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: { email: string; password: string; }) {
                
                if (!credentials?.email || !credentials?.password)
                    {return null;}
                return await authorizeUser(credentials.email,credentials.password);
            },

        }),

    ],
    session: {
        strategy: 'jwt',
    },
  
}

