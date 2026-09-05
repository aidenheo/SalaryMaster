import type { MetadataRoute } from "next";
import { calculators } from "@/lib/calculatorList";

const siteUrl = "https://salary-master.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/privacy", "/terms", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-01-01"),
  }));

  const calculatorRoutes = calculators.map((calc) => ({
    url: `${siteUrl}/calculators/${calc.slug}`,
    lastModified: new Date("2026-01-01"),
  }));

  return [...staticRoutes, ...calculatorRoutes];
}
