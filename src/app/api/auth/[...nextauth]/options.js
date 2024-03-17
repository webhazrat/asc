import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";
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
          if (!student) {
            throw new Error("মোবাইল নাম্বার ব্যবহার করে কোন অ্যাকাউন্ট নাই");
          } else {
            if (student && compareSync(password, student.password)) {
              return student;
            } else {
              throw new Error("মোবাইল নাম্বার ও পাসওয়ার্ড সঠিক নয়");
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
