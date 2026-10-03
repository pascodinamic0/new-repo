const CACHE = "mtusda-v4"
self.addEventListener("install", event => { self.skipWaiting() })
self.addEventListener("activate", event => { event.waitUntil(self.clients.claim()) })
self.addEventListener("fetch", event => {
  const req = event.request
  if (req.method !== "GET") return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return
  if (url.pathname.startsWith("/api/auth") || url.pathname.startsWith("/api/posts") || url.pathname.startsWith("/api/bookmarks") || url.pathname.startsWith("/api/notes") || url.pathname.startsWith("/api/announcements")) return
  event.respondWith((async () => {
    const cache = await caches.open(CACHE)
    try {
      const res = await fetch(req)
      if (res && res.ok) cache.put(req, res.clone())
      return res
    } catch (err) {
      const cached = await cache.match(req)
      if (cached) return cached
      if (req.mode === "navigate") {
        const home = await cache.match("/")
        if (home) return home
      }
      throw err
    }
  })())
})
