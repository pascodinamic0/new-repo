import { test, expect } from "@playwright/test"
import fs from "fs"

test("four pillars in French and English", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "full flow runs once")
  await page.goto("/compte")
  await page.getByTestId("demo-login").click()
  await expect(page.getByTestId("account-name")).toHaveText("Démo MTUSDA")

  await page.goto("/bible/john/3")
  await expect(page.getByTestId("verse-16")).toContainText("aimé")

  await page.goto("/bible")
  await page.getByTestId("bible-search").fill("John 3:16")
  await page.getByTestId("bible-search").press("Enter")
  await expect(page).toHaveURL(/\/bible\/john\/3/)
  await expect(page.getByTestId("verse-16")).toContainText("aimé")
  await page.getByTestId("bookmark-verse").click()
  await expect(page.getByRole("status")).toContainText(/Signet/)

  await page.goto("/cantiques/amazing-grace")
  await expect(page.getByTestId("lyrics")).toContainText("Grâce")
  await page.getByTestId("play").click()
  await expect.poll(async () => page.locator("audio").evaluate((a: HTMLAudioElement) => !a.paused && a.readyState >= 2)).toBeTruthy()

  await page.goto("/lecons/sabbat-cadeau")
  await expect(page.getByTestId("lesson-body").first()).toContainText("Kinshasa")

  await page.goto("/communaute")
  await expect(page.getByTestId("announcement")).toContainText(/sabbat/i)

  await page.locator('[data-testid="lang-en"]:visible').click()
  await expect(page.getByTestId("announcement")).toContainText(/Sabbath/i)
  await page.goto("/bible/john/3")
  await expect(page.getByTestId("verse-16")).toContainText("loved")
  await page.goto("/cantiques/amazing-grace")
  await expect(page.getByTestId("lyrics")).toContainText("Amazing grace")
  await page.goto("/lecons/sabbat-cadeau")
  await expect(page.getByTestId("lesson-body").first()).toContainText("Sabbath")

  await page.goto("/")
  await page.evaluate(async () => { await navigator.serviceWorker.ready })
  await page.reload()
  await page.goto("/bible/john/1")
  await expect(page.getByTestId("verse-1")).toContainText(/beginning|In the/i)
  await page.waitForTimeout(800)
  await page.context().setOffline(true)
  await page.reload()
  await expect(page.getByTestId("verse-1")).toContainText(/beginning|In the|commencement/i)
  await page.context().setOffline(false)
})

test("screens and crawl", async ({ page }, info) => {
  const shot = `qa/shots/${info.project.name}.png`
  fs.mkdirSync("qa/shots", { recursive: true })
  await page.goto("/")
  await page.screenshot({ path: shot, fullPage: true })
  if (info.project.name !== "desktop") return
  const hrefs = await page.locator("a[href^='/']").evaluateAll(nodes => nodes.map(n => (n as HTMLAnchorElement).getAttribute("href")).filter(Boolean) as string[])
  const extra = ["/bible", "/bible/john", "/bible/john/3", "/cantiques", "/cantiques/amazing-grace", "/lecons", "/lecons/sabbat-cadeau", "/communaute", "/compte", "/livres", "/livres/steps-to-christ", "/eglise", "/traduction"]
  const unique = [...new Set([...hrefs, ...extra])]
  for (const href of unique) {
    const res = await page.request.get(href!)
    expect(res.status(), href).toBeLessThan(400)
  }
  const missing = await page.request.get("/cette-page-n-existe-pas")
  expect(missing.status()).toBe(404)
  expect(await missing.text()).toContain("n'existe pas")
})
