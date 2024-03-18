import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token);

    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      req.nextauth.token?.role !== "Admin"
    ) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/profile/event-participants") &&
      req.nextauth.token?.role !== "Head"
    ) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*"],
};
