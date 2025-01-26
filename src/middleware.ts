import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./helpers/get-url";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.csrf-token");
  const pathname = request.nextUrl.pathname;

  if (
    (!token && pathname === "/my-orders") ||
    (!token && pathname === "/my-favorite-restaurants")
  ) {
    return NextResponse.redirect(new URL(getUrl("/")));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
