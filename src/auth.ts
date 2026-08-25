import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      id: "phone",
      name: "Phone",
      credentials: {
        phone: { label: "Phone", type: "text" },
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        const phone = String(credentials?.phone || "").replace(/\D/g, "");
        const token = String(credentials?.token || "");
        if (!phone || !token) return null;
        const { verifyPhoneTicket } = await import("@/lib/otp");
        const ok = verifyPhoneTicket(token, phone);
        if (!ok) return null;
        return {
          id: `phone:${phone}`,
          name: `+${phone}`,
          email: `${phone}@phone.local`,
          image: null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (user?.id) token.uid = user.id;
      if (account?.providerAccountId) token.uid = account.providerAccountId;
      if (user?.email?.endsWith("@phone.local")) {
        token.phone = user.name?.replace("+", "") || "";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = (token.uid as string) || token.sub || "";
        if (token.phone) {
          session.user.name = `+${token.phone}`;
        }
      }
      return session;
    },
  },
  trustHost: true,
});
