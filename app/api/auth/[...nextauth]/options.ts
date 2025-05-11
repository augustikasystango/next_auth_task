import { authorizeUser } from "@/lib/auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          // Return all the profile information you need.
          // The only truly required field is `id`
          // to be able identify the account when added to a database
          id: profile.sub, // Fix: Map `sub` to `id`
          name: profile.name,
          email: profile.email,
        };
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await authorizeUser(
          credentials.email,
          credentials.password
        );
        console.log("Returned user : ", user);

        if (user && user.id) {
          return user;
        }
        return null;
      },
      credentials: undefined,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const res = await fetch("http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
          }),
        });

        if (!res.ok) {
          console.error("Failed to save user:", await res.text());
        }
      } catch (err) {
        console.error("Error saving user to db.json:", err);
      }

      return true;
    },
  },
};
