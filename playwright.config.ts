import { defineConfig, devices } from "@playwright/test"
const base = process.env.BASE_URL || "https://mtusda.vercel.app"
export default defineConfig({
  testDir: "e2e",
  timeout: 90000,
  expect: { timeout: 20000 },
  use: { baseURL: base, trace: "off" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "se", use: { viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true, userAgent: devices["iPhone SE"].userAgent } },
    { name: "iphone15", use: { viewport: { width: 430, height: 932 }, isMobile: true, hasTouch: true, userAgent: devices["iPhone 15 Pro Max"].userAgent } },
    { name: "pixel", use: { viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true, userAgent: devices["Pixel 7"].userAgent } },
    { name: "ipad", use: { viewport: { width: 820, height: 1180 }, isMobile: true, hasTouch: true, userAgent: devices["iPad (gen 7)"].userAgent } },
  ],
})
