import { sanityClient, urlFor } from "./sanity";

export type SportRef = { name: string; slug: string };
export type Sport = { _id: string; name: string; slug: string; order?: number };

export type SanityImage = { asset?: { _ref: string } } | null | undefined;
export type SanityFile = { asset?: { _ref: string; url?: string } } | null | undefined;

export interface Article {
  _id: string;
  title: string;
  slug?: { current: string };
  excerpt?: string;
  image?: SanityImage;
  publishedAt?: string;
  featured?: boolean;
  trendingRank?: number;
  sport?: SportRef;
  content?: unknown[];
}

export interface Tweet {
  _id: string;
  authorName: string;
  handle: string;
  avatar?: SanityImage;
  content: string;
  image?: SanityImage;
  tweetDate: string;
  tweetUrl: string;
  verified?: boolean;
  likes?: number;
  replies?: number;
  reposts?: number;
  sport?: SportRef;
}

export interface Highlight {
  _id: string;
  title: string;
  description?: string;
  date?: string;
  youtubeId?: string;
  publishedAt?: string;
  sport?: SportRef;
}

export interface Match {
  _id: string;
  team1: string;
  team2: string;
  team1Logo?: SanityImage;
  team2Logo?: SanityImage;
  date: string;
  tournament?: string;
  stadium?: string;
  sport?: SportRef;
}

const sportProj = `"sport": sport->{name, "slug": slug.current}`;

export const sportsQuery = `*[_type=="sportCategory"]|order(coalesce(order, 1) asc){_id, name, "slug": slug.current, order}`;

export const articlesQuery = `*[_type=="article" && ($slug=="all" || sport->slug.current==$slug)]
  | order(coalesce(trendingRank, 1) asc, publishedAt desc)[0...12]{
  _id, title, "slug": slug.current, excerpt, image, content, 
  featured, publishedAt, trendingRank, ${sportProj}
}`;

export const articleBySlugQuery = `*[_type=="article" && slug.current==$slug][0]{
  _id, title, "slug": slug.current, excerpt, image, imageUrl,
  content, publishedAt, trendingRank, ${sportProj}
}`;

export const tweetsQuery = `*[_type=="tweet" && ($slug=="all" || sport->slug.current==$slug)]
  | order(tweetDate desc)[0...12]{
  _id, authorName, handle, avatar, content, image,
  tweetDate, tweetUrl, verified, likes, replies, reposts, ${sportProj}
}`;

export const highlightsQuery = `*[_type=="highlight" && ($slug=="all" || sport->slug.current==$slug)]
  | order(publishedAt desc)[0...9]{
  _id, title, youtubeId, description, publishedAt, ${sportProj}
}`;

export const matchesQuery = `*[_type=="match" && ($slug=="all" || sport->slug.current==$slug) && dateTime(date) >= dateTime(now()) - 60*60*3]
  | order(date asc)[0...15]{
  _id, team1, team2, team1Logo, team2Logo, date, tournament, stadium, ${sportProj}
}`;

// ── Data fetching functions (server-side, no React Query needed) ──
export async function getSports(): Promise<Sport[]> {
  return sanityClient.fetch(sportsQuery);
}

export async function getArticles(slug = "all"): Promise<Article[]> {
  return sanityClient.fetch(articlesQuery, { slug });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return sanityClient.fetch(articleBySlugQuery, { slug });
}

export async function getTweets(slug = "all"): Promise<Tweet[]> {
  return sanityClient.fetch(tweetsQuery, { slug });
}

export async function getHighlights(slug = "all"): Promise<Highlight[]> {
  return sanityClient.fetch(highlightsQuery, { slug });
}

export async function getMatches(slug = "all"): Promise<Match[]> {
  return sanityClient.fetch(matchesQuery, { slug });
}

// ── Helper functions (same as before) ──
export function articleImage(a: Article, w = 1200, h?: number): string | undefined {
  if (a.image && (a.image as { asset?: unknown })?.asset) {
    let b = urlFor(a.image).width(w).auto("format").quality(65);
    if (h) b = b.height(h).fit("crop");
    return b.url();
  }
}

export function teamLogo(src: SanityImage, fallback?: string): string | undefined {
  if (src && (src as { asset?: unknown })?.asset)
    return urlFor(src).width(80).height(80).fit("crop").url();
  return fallback;
}

export function tweetAvatar(src?: SanityImage): string | undefined {
  if (src && (src as { asset?: unknown })?.asset)
    return urlFor(src).width(96).height(96).fit("crop").auto("format").url();
  return undefined;
}

export function tweetImage(src?: SanityImage): string | undefined {
  if (src && (src as { asset?: unknown })?.asset)
    return urlFor(src).width(900).auto("format").quality(65).url();
  return undefined;
}

export function extractYouTubeId(input?: string): string | undefined {
  if (!input) return undefined;
  const trimmed = input.trim();
  if (/^[A-Za-z0-9_-]{6,15}$/.test(trimmed)) return trimmed;
  const m = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{6,15})/,
  );
  return m?.[1];
}

export function highlightThumbnail(h: Highlight): string | undefined {
  const yt = extractYouTubeId(h.youtubeId);
  if (yt) return `https://img.youtube.com/vi/${yt}/hqdefault.jpg`;
  return undefined;
}

export function relativeTime(iso?: string): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
