import { sanityClient } from './sanity'

const siteUrl = 'https://sports-news-project.vercel.app'

export async function getSitemapUrls() {
  const data = await sanityClient.fetch<{
    articles?: { slug?: string; _updatedAt?: string }[]
  }>(`
    {
      "articles": *[_type=="article" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }
    }
  `)

  const staticUrls = [
    `${siteUrl}/`,
    `${siteUrl}/football`,
    `${siteUrl}/cricket`,
    `${siteUrl}/basketball`,
    `${siteUrl}/tennis`,
    `${siteUrl}/mma`,
    `${siteUrl}/formula-1`,
    `${siteUrl}/wwe`,
    `${siteUrl}/esports`,
    `${siteUrl}/newsletter`,
    `${siteUrl}/about`,
    `${siteUrl}/contact`,
    `${siteUrl}/advertise`,
    `${siteUrl}/privacy`,
    `${siteUrl}/terms-and-conditions`,
    `${siteUrl}/disclaimer`,
    `${siteUrl}/editorial-policy`,
  ]

  const dynamicUrls =
    data?.articles?.map((a) => `${siteUrl}/article/${a.slug}`) ?? []

  return [...new Set([...staticUrls, ...dynamicUrls])]
}

export function buildSitemapXml(urls: string[]) {
  const items = urls
    .map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`
}