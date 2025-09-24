import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./db";
import User from "@/model/user";

export const authOptions : NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Passwords", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        try {
          await connectToDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this");
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.error("Auth error: ", error);
          throw error;
        }
      },
    }),
  ],
    callbacks:{
        async jwt({ token, user }: { token: any; user?: any }) {
            if(user){
                token.id = user.id 
            }
            return token;

        },
         async session({ session, token }: { session: any; user?: any; token: any }) {
            if(session.user){
                session.user.id = token.id 
            }
            return session;  
            
        }
    },
    pages: {
        signIn : "/login",
        error: "/login",
        
    },
    session:{
        strategy:"jwt",
        maxAge: 30*24*60*60,
    },
    secret: process.env.NEXTAUTH_SECRET,
};



