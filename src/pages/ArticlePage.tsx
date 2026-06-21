import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PortableText } from "@portabletext/react";

import {
  articleImage,
  relativeTime,
} from "../lib/sanity.queries";

import { sanityClient } from "../lib/sanity";

const articleQuery = `
*[_type=="article" && slug.current==$slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  image,
  trendingRank,
  publishedAt,
  "sport": sport->{name, "slug": slug.current}
}
`;

export default function ArticlePage() {
  const { slug } = useParams();

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", slug],
    queryFn: () =>
      sanityClient.fetch(articleQuery, { slug }),
     staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return (
      <div className="container-wide py-24">
        Loading article...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container-wide py-24">
        <h1 className="text-3xl font-bold">
          Article not found
        </h1>

        <Link
          to="/"
          className="mt-6 inline-block text-accent"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

 const img = articleImage(article, 1200, 675);

  return (
    <div className="container-wide py-10">
      <Link
        to="/"
        className="text-sm text-accent font-medium"
      >
        ← Back
      </Link>

      <div className="mt-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>
            {article.sport?.name}
          </span>

          <span>•</span>

          <span>
            {relativeTime(article.publishedAt)}
          </span>
        </div>

        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight text-balance">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
            {article.excerpt}
          </p>
        )}

        {img && (
         <img
          src={img}
          alt={article.title}
          width={1200}
          height={675}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="mt-10 w-full rounded-3xl object-cover"
         />
        )}

        <div className="prose prose-invert lg:prose-xl max-w-none mt-12">
          <PortableText value={article.content} />
        </div>
      </div>
    </div>
  );
}