import { MetadataRoute } from "next";
import { products } from "@/data/products";

const BASE_URL = "https://iclub-two.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const productPages = products.map((product) => ({
    url: `${BASE_URL}/producto/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/cotizador`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...productPages,
  ];
}
