import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/login",
  },
})

export const config = {
  matcher: [
    "/favorites",
    "/favorites/:path*",
    "/compare",
    "/compare/:path*",
    "/predictor",
    "/predictor/:path*",
  ],
}
