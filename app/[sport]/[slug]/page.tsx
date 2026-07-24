import { getArticleBySlug, getSports, articleImage } from "../../../src/lib/sanity.queries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "../../../src/components/Navbar";
import Footer from "../../../src/components/Footer";
import { PortableText } from "@portabletext/react";

export const revalidate = 60;

interface Props {
  params: { sport: string; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "Article Not Found" };

  const image = articleImage(article, 1200, 630);

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
    },
    alternates: {
    canonical: `https://sports-news-project.vercel.app/${params.sport}/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      images: image ? [image] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const image = articleImage(article, 1200, 630);
  const sports = await getSports();

  return (
    <>
      <Navbar sports={sports} currentSport={params.sport} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <div className="mb-8">
          {article.sport && (
            <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
              {article.sport.name}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              {article.excerpt}
            </p>
          )}
          {article.publishedAt && (
            <time className="text-sm text-gray-400">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </time>
          )}
        </div>

        {/* Featured Image */}
        {image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={image}
              alt={article.title}
              className="w-full h-auto object-cover"
              width={1200}
              height={630}
            />
          </div>
        )}

        {/* Article Body — Portable Text */}
        {article.content && (
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline">
            <PortableText
              value={article.content as never}
              components={{
                block: {
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>
                  ),
                  normal: ({ children }) => (
                    <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
                  ),
                },
                marks: {
                  link: ({ children, value }) => (
                    <a
                      href={value?.href}
                      className="text-red-600 font-medium hover:underline"
                      target={value?.href?.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">{children}</ul>
                  ),
                },
              }}
            />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
