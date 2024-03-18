import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import connectDB from "@/lib/connect";
import studentModel from "@/models/studentModel";
import { loginSchema } from "@/lib/zodSchema";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        try {
          loginSchema.parse(credentials);
          const { phone, password } = credentials;
          await connectDB();
          const student = await studentModel.findOne({ phone });
          if (!student || student?.status === "Unverified") {
            throw new Error("কোনো অ্যাকাউন্ট পাওয়া যায়নি");
          } else {
            const isOk = await compare(password, student.password);
            if (isOk) {
              return student;
            } else {
              throw new Error("মোবাইল নাম্বার ও পাসওয়ার্ড মেলে না");
            }
          }
        } catch (error) {
          return Promise.reject({
            message: error.message,
          });
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user._id = token._id;
      }
      return session;
    },
  },
};
