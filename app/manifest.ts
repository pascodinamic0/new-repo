import type { MetadataRoute } from "next"
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MTUSDA Kinshasa",
    short_name: "MTUSDA",
    description: "Bible, cantiques, leçons et communauté MTUSDA.",
    id: "/",
    scope: "/",
    start_url: "/",
    display: "standalone",
    background_color: "#102848",
    theme_color: "#102848",
    lang: "fr",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  }
}
