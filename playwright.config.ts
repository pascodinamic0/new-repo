import { defineConfig, devices } from "@playwright/test"
const base = process.env.BASE_URL || "http://127.0.0.1:3000"
export default defineConfig({
  testDir: "e2e",
  timeout: 90000,
  expect: { timeout: 15000 },
  use: { baseURL: base, trace: "off" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "se", use: { ...devices["iPhone SE"], viewport: { width: 375, height: 667 } } },
    { name: "iphone15", use: { viewport: { width: 430, height: 932 }, isMobile: true, hasTouch: true } },
    { name: "pixel", use: { ...devices["Pixel 7"] } },
    { name: "ipad", use: { viewport: { width: 820, height: 1180 }, isMobile: true, hasTouch: true } },
  ],
})
