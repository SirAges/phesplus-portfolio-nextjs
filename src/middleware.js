import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export function middleware(request) {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  if (request.nextUrl.pathname.startsWith("/dashboard/saveusertodb") && !user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));

    // return NextResponse.rewrite(new URL("/about-2", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/admin") && !user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));

    // return NextResponse.rewrite(new URL("/about-2", request.url));
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
