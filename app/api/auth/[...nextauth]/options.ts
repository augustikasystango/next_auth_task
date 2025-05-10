import { authorizeUser } from "@/lib/auth";
import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          
            async authorize(credentials,req) {
                
                if (!credentials?.email || !credentials?.password)
                    {return null;}
                const user =  await authorizeUser(credentials.email,credentials.password);
                console.log("Returned user : ",user);

                if(user && user.id)
                {
                    return user;
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
  
}

