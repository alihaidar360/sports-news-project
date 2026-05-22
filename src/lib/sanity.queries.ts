// import { queryOptions } from "@tanstack/react-query";
// import { sanityClient, urlFor } from "./sanity";

// export type SportRef = { name: string; slug: string};
// export type Sport = { _id: string; name: string; slug: string; order?: number };

// export type SanityImage = { asset?: { _ref: string } } | null | undefined;

// export interface Article {
//   _id: string;
//   title: string;
//   slug: string;
//   excerpt?: string;
//   image?: SanityImage;
//   imageUrl?: string;
//   publishedAt?: string;
//   featured?: boolean;
//   trendingRank?: number;
//   sport?: SportRef;
// }

// export interface Tweet {
//   _id: string;
//   author: string;
//   handle: string;
//   verified?: boolean;
//   avatar?: SanityImage;
//   avatarUrl?: string;
//   content: string;
//   time?: string;
//   likes?: string;
//   replies?: string;
//   reposts?: string;
//   url?: string;
//   publishedAt?: string;
//   sport?: SportRef;
// }

// export interface Highlight {
//   _id: string;
//   title: string;
//   description?: string;
//   date?: string;
//   youtubeId: string;
//   publishedAt?: string;
//   sport?: SportRef;
// }

// export interface Match {
//   _id: string;
//   team1: string;
//   team2: string;
//   team1Logo?: SanityImage;
//   team2Logo?: SanityImage;
//   team1LogoUrl?: string;
//   team2LogoUrl?: string;
//   date: string;
//   tournament?: string;
//   stadium?: string;
//   sport?: SportRef;
// }

// const sportProj = `"sport": sport->{name, "slug": slug.current}`;

// const sportsQuery = `*[_type=="sportCategory"]|order(coalesce(order, 999) asc){_id, name, "slug": slug.current, order}`;

// const articlesQuery = `*[_type=="article" && ($slug=="all" || sport->slug.current==$slug)]
//   | order(coalesce(trendingRank, 999) asc, publishedAt desc)[0...10]{
//     _id,
//     title,
//     slug,
//     excerpt,
//     image,
//     imageUrl,
//     featured,
//     publishedAt,
//     trendingRank,
//     ${sportProj}
//   }`;

// const tweetsQuery = `*[_type=="tweet" && ($slug=="all" || sport->slug.current==$slug)]
//   | order(publishedAt desc)[0...12]{
//     _id, author, handle, verified, avatar, avatarUrl, content, time, likes, replies, reposts, url, ${sportProj}
//   }`;

// const highlightsQuery = `*[_type=="highlight" && ($slug=="all" || sport->slug.current==$slug)]
//   | order(publishedAt desc)[0...12]{
//     _id, title, description, date, youtubeId, ${sportProj}
//   }`;

// const matchesQuery = `*[_type=="match" && ($slug=="all" || sport->slug.current==$slug) && date >= now()]
//   | order(date asc)[0...10]{
//     _id, team1, team2, team1Logo, team2Logo, team1LogoUrl, team2LogoUrl, date, tournament, stadium, ${sportProj}
//   }`;

// export const sportsQueryOptions = () =>
//   queryOptions({
//     queryKey: ["sanity", "sports"],
//     queryFn: () => sanityClient.fetch<Sport[]>(sportsQuery),
//     staleTime: 1000 * 60 * 10,
//   });

// export const articlesQueryOptions = (slug: string) =>
//   queryOptions({
//     queryKey: ["sanity", "articles", slug],
//     queryFn: () => sanityClient.fetch<Article[]>(articlesQuery, { slug }),
//     staleTime: 1000 * 60,
//   });

// export const tweetsQueryOptions = (slug: string) =>
//   queryOptions({
//     queryKey: ["sanity", "tweets", slug],
//     queryFn: () => sanityClient.fetch<Tweet[]>(tweetsQuery, { slug }),
//     staleTime: 1000 * 60,
//   });

// export const highlightsQueryOptions = (slug: string) =>
//   queryOptions({
//     queryKey: ["sanity", "highlights", slug],
//     queryFn: () => sanityClient.fetch<Highlight[]>(highlightsQuery, { slug }),
//     staleTime: 1000 * 60 * 5,
//   });

// export const matchesQueryOptions = (slug: string) =>
//   queryOptions({
//     queryKey: ["sanity", "matches", slug],
//     queryFn: () => sanityClient.fetch<Match[]>(matchesQuery, { slug }),
//     staleTime: 1000 * 60 * 5,
//   });

// export function articleImage(a: Article, w = 1200, h?: number): string | undefined {
//   if (a.image && (a.image as { asset?: unknown })?.asset) {
//     let b = urlFor(a.image).width(w).auto("format").quality(75);
//     if (h) b = b.height(h).fit("crop");
//     return b.url();
//   }
//   return a.imageUrl;
// }

// export function tweetAvatar(t: Tweet): string | undefined {
//   if (t.avatar && (t.avatar as { asset?: unknown })?.asset) {
//     return urlFor(t.avatar).width(96).height(96).fit("crop").url();
//   }
//   return t.avatarUrl;
// }

// export function teamLogo(src: SanityImage, fallback?: string): string | undefined {
//   if (src && (src as { asset?: unknown })?.asset) {
//     return urlFor(src).width(80).height(80).fit("crop").url();
//   }
//   return fallback;
// }

// export function relativeTime(iso?: string): string {
//   if (!iso) return "";
//   const diff = Date.now() - new Date(iso).getTime();
//   const m = Math.floor(diff / 60000);
//   if (m < 1) return "just now";
//   if (m < 60) return `${m}m ago`;
//   const h = Math.floor(m / 60);
//   if (h < 24) return `${h}h ago`;
//   const d = Math.floor(h / 24);
//   return `${d}d ago`;
// }







import { queryOptions } from "@tanstack/react-query";
import { sanityClient, urlFor } from "./sanity";

export type SportRef = { name: string; slug: string };
export type Sport = { _id: string; name: string; slug: string; order?: number };

export type SanityImage = { asset?: { _ref: string } } | null | undefined;

export interface Article {
  _id: string;
  title: string;
  slug: string;
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
  author: string;
  handle: string;
  verified?: boolean;
  avatar?: SanityImage;
  avatarUrl?: string;
  content: string;
  time?: string;
  likes?: string;
  replies?: string;
  reposts?: string;
  url?: string;
  tweetId?: string;   // ✅ ADDED
  publishedAt?: string;
  sport?: SportRef;
}

export interface Highlight {
  _id: string;
  title: string;
  description?: string;
  date?: string;
  youtubeId: string;
  publishedAt?: string;
  sport?: SportRef;
};

export interface Match {
  _id: string;
  team1: string;
  team2: string;
  team1Logo?: SanityImage;
  team2Logo?: SanityImage;
  team1LogoUrl?: string;
  team2LogoUrl?: string;
  date: string;
  tournament?: string;
  stadium?: string;
  sport?: SportRef;
};

const sportProj = `"sport": sport->{name, "slug": slug.current}`;

const sportsQuery = `*[_type=="sportCategory"]|order(coalesce(order, 999) asc){_id, name, "slug": slug.current, order}`;

const articlesQuery = `*[_type=="article" && ($slug=="all" || sport->slug.current==$slug)]
  | order(coalesce(trendingRank, 999) asc, publishedAt desc)[0...10]{
    _id,
    title,
    slug,
    excerpt,
    image,
    imageUrl,
    featured,
    publishedAt,
    trendingRank,
    ${sportProj}
  }`;


// 🔥 FIXED QUERY (MAIN FIX HERE)
const tweetsQuery = `*[_type=="tweet" && ($slug=="all" || sport->slug.current==$slug)]
  | order(publishedAt desc)[0...12]{
    _id,
    author,
    handle,
    verified,
    avatar,
    avatarUrl,
    content,
    time,
    likes,
    replies,
    reposts,
    url,

    // ✅ extract tweet ID from URL
    "tweetId": url match "*/status/*" ? string(split(url, "/")[length(split(url, "/")) - 1]) : null,

    ${sportProj}
  }`;

const highlightsQuery = `*[_type=="highlight" && ($slug=="all" || sport->slug.current==$slug)]
  | order(publishedAt desc)[0...12]{
    _id, title, description, date, youtubeId, ${sportProj}
  }`;

const matchesQuery = `*[_type=="match" && ($slug=="all" || sport->slug.current==$slug) && date >= now()]
  | order(date asc)[0...10]{
    _id, team1, team2, team1Logo, team2Logo, team1LogoUrl, team2LogoUrl, date, tournament, stadium, ${sportProj}
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
    staleTime: 1000 * 60 * 5,
  });

export function articleImage(a: Article, w = 1200, h?: number): string | undefined {
  if (a.image && (a.image as { asset?: unknown })?.asset) {
    let b = urlFor(a.image).width(w).auto("format").quality(75);
    if (h) b = b.height(h).fit("crop");
    return b.url();
  }
  return a.imageUrl;
}

export function tweetAvatar(t: Tweet): string | undefined {
  if (t.avatar && (t.avatar as { asset?: unknown })?.asset) {
    return urlFor(t.avatar).width(96).height(96).fit("crop").url();
  }
  return t.avatarUrl;
}

export function teamLogo(src: SanityImage, fallback?: string): string | undefined {
  if (src && (src as { asset?: unknown })?.asset) {
    return urlFor(src).width(80).height(80).fit("crop").url();
  }
  return fallback;
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