import type { NextConfig } from "next"
const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingIncludes: {
    "/api/bible/chapter": ["./data/bible/**/*"],
    "/api/bible/search": ["./data/bible/**/*"],
    "/api/books": ["./data/books/**/*"],
  },
}
export default nextConfig
