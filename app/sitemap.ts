import { MetadataRoute } from "next";
import { sanityClient } from "../src/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://sports-news-project.vercel.app";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/editorial-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/advertise`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  // Sport pages
  const sports = await sanityClient.fetch<{ slug: string }[]>(
    `*[_type=="sportCategory"]{  "slug": slug.current}`
  );

  const sportPages: MetadataRoute.Sitemap = sports.map((s) => ({
    url: `${baseUrl}/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.9,
  }));

  // Article pages
  const articles = await sanityClient.fetch<{ slug: string; sport: { slug: string }; publishedAt: string }[]>(
    `*[_type=="article" && !(_id in path("drafts.**"))]{
      "slug": slug.current,
      "sport": sport->{  "slug": slug.current},
      publishedAt
    }`
  );

  const articlePages: MetadataRoute.Sitemap = articles
    .filter((a) => a.slug && a.sport?.slug)
    .map((a) => ({
      url: `${baseUrl}/${a.sport.slug}/${a.slug}`,
      lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...staticPages, ...sportPages, ...articlePages];
}
