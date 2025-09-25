// Guard: in full mock mode, short-circuit this file to avoid next-auth env import
if (process.env.MOCK_MODE === 'true') {
  export default function handler(req, res) {
    return res.status(200).json({ ok: true, mock: true })
  }
}

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

const isMock = process.env.MOCK_MODE === 'true' || process.env.NODE_ENV === 'development';

export const authOptions = {
  providers: [
    // In mock mode, rely only on Credentials with hardcoded users
    ...(isMock
      ? []
      : [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Mock users for offline demo
        if (isMock) {
          const demoUsers = [
            { id: '1', name: 'Admin User', email: 'admin@temple.com', password: 'password123' },
            { id: '2', name: 'Regular User', email: 'user@temple.com', password: 'password123' },
          ];
          const found = demoUsers.find(u => u.email === credentials.email && u.password === credentials.password);
          if (found) {
            return { id: found.id, name: found.name, email: found.email };
          }
          throw new Error("Invalid credentials");
        }

        // Real DB auth when not in mock
        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials.email });
          if (!user) throw new Error("No user found with this email");
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) throw new Error("Invalid password");
          return { id: user._id.toString(), name: user.name, email: user.email };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);

