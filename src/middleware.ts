export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/dashboard/:path*", "/lessons/:path*", "/practice/:path*"],
}
