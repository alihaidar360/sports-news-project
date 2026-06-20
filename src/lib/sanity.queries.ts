import { queryOptions } from "@tanstack/react-query";
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
  imageUrl?: string;
  publishedAt?: string;
  featured?: boolean;
  trendingRank?: number;
  sport?: SportRef;
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
  videoSource?: "youtube" | "upload";
  youtubeId?: string;
  videoFileUrl?: string;
  customThumbnail?: SanityImage;
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

const sportsQuery = `*[_type=="sportCategory"]|order(coalesce(order, 999) asc){_id, name, "slug": slug.current, order}`;

const articlesQuery = `*[_type=="article" && ($slug=="all" || sport->slug.current==$slug)]
  | order(coalesce(trendingRank, 999) asc, publishedAt desc)[0...10]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  image,
  imageUrl,
  featured,
  publishedAt,
  trendingRank,
  ${sportProj}
  }`;

const tweetsQuery = `*[_type=="tweet" && ($slug=="all" || sport->slug.current==$slug)]
  | order(tweetDate desc)[0...12]{
    _id,
    authorName,
    handle,
    avatar,
    content,
    image,
    tweetDate,
    tweetUrl,
    verified,
    likes,
    replies,
    reposts,
    ${sportProj}
  }`;

const highlightsQuery = `*[_type=="highlight" && ($slug=="all" || sport->slug.current==$slug)]
  | order(publishedAt desc)[0...12]{
    _id, 
    title, 
    description, 
    youtubeId,
    customThumbnail,
    publishedAt,
    ${sportProj}
  }`;

const matchesQuery = `*[_type=="match" && ($slug=="all" || sport->slug.current==$slug) && dateTime(date) >= dateTime(now()) - 60*60*3]
  | order(date asc)[0...12]{
    _id,
    team1,
    team2,
    team1Logo,
    team2Logo,
    date,
    tournament,
    stadium,
    ${sportProj}
  }`;

export const sportsQueryOptions = () =>
  queryOptions({
    queryKey: ["sanity", "sports"],
    queryFn: () => sanityClient.fetch<Sport[]>(sportsQuery),
    staleTime: 1000 * 60 * 10,
  });

export const articlesQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["sanity", "articles", slug],
    queryFn: () => sanityClient.fetch<Article[]>(articlesQuery, { slug }),
    staleTime: 1000 * 60,
  });

export const tweetsQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["sanity", "tweets", slug],
    queryFn: () => sanityClient.fetch<Tweet[]>(tweetsQuery, { slug }),
    staleTime: 1000 * 60,
  });

export const highlightsQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["sanity", "highlights", slug],
    queryFn: () => sanityClient.fetch<Highlight[]>(highlightsQuery, { slug }),
    staleTime: 1000 * 60 * 5,
  });

export const matchesQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["sanity", "matches", slug],
    queryFn: () => sanityClient.fetch<Match[]>(matchesQuery, { slug }),
    staleTime: 1000 * 30,
  });

export function articleImage(a: Article, w = 1200, h?: number): string | undefined {
  if (a.image && (a.image as { asset?: unknown })?.asset) {
    let b = urlFor(a.image).width(w).auto("format").quality(75);
    if (h) b = b.height(h).fit("crop");
    return b.url();
  }
  return a.imageUrl;
}

export function teamLogo(src: SanityImage, fallback?: string): string | undefined {
  if (src && (src as { asset?: unknown })?.asset) {
    return urlFor(src).width(80).height(80).fit("crop").url();
  }
  return fallback;
}

export function tweetAvatar(src?: SanityImage): string | undefined {
  if (src && (src as { asset?: unknown })?.asset) {
    return urlFor(src).width(96).height(96).fit("crop").auto("format").url();
  }
  return undefined;
}

export function tweetImage(src?: SanityImage): string | undefined {
  if (src && (src as { asset?: unknown })?.asset) {
    return urlFor(src).width(900).auto("format").quality(75).url();
  }
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
  if (h.customThumbnail && (h.customThumbnail as { asset?: unknown })?.asset) {
    return urlFor(h.customThumbnail).width(960).height(540).fit("crop").auto("format").url();
  }
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