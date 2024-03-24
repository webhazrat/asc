import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      !req.nextauth.token?.role.includes("Admin")
    ) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/profile/event-participants") &&
      !req.nextauth.token?.role.includes("Head")
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
