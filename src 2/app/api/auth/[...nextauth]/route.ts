import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@prisma/client/runtime/library";
import { prisma } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Import authOptions from src/lib/auth.ts

// Remove the local authOptions definition as it's now imported
// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         return {
//           ...token,
//           role: user.role,
//         };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           role: token.role,
//         }
//       };
//     }
//   },
//   pages: {
//     signIn: "/auth/signin",
//     error: "/auth/error",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };