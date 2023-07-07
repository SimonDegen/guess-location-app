import NextAuth, { NextAuthOptions } from "next-auth";
import clientPromise from "@/lib/connectToMongoDB";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const AuthOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise, { databaseName: "VippsGame" }) as any,
  providers: [
    {
      id: "vipps",
      name: "Vipps",
      type: "oauth",
      version: "2.0",
      wellKnown:
        "https://apitest.vipps.no/access-management-1.0/access/.well-known/openid-configuration",
      authorization: { params: { scope: "openid email name phoneNumber" } },
      idToken: true,
      userinfo: {
        async request(context) {
          return await context.client.userinfo(context.tokens.access_token!);
        },
      },
      async profile(profile: any, tokens: any) {
        console.log(profile);
        // You can use the tokens, in case you want to fetch more profile information
        // For example several OAuth providers do not return email by default.
        // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      clientId: process.env.VIPPS_CLIENT_ID,
      clientSecret: process.env.VIPPS_CLIENT_SECRET,
    },
  ],

  secret: process.env.SECRET,
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
};

const handler = NextAuth(AuthOptions);
export { handler as GET, handler as POST };
