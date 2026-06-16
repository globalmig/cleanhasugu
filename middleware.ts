import { NextResponse, type NextRequest } from "next/server";

async function sessionToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const expected = await sessionToken(pw);
  const session = request.cookies.get("admin_session")?.value;

  if (session !== expected) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
