import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackNavigation } from "@/components/BackNavigation";
import { BLOG_TITLE, BLOG_URL } from "@/lib/blog/config";
import { formatPostDate, getAllPosts, getPostBySlug } from "@/lib/blog/posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: `${post.date}T00:00:00.000Z`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const postUrl = `${BLOG_URL}/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: `${post.date}T00:00:00.000Z`,
    dateModified: `${post.date}T00:00:00.000Z`,
    mainEntityOfPage: postUrl,
    author: {
      "@type": "Person",
      name: "Ellis Alcantara",
      url: "https://alcantinez.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Ellis Alcantara",
    },
    isPartOf: {
      "@type": "Blog",
      name: BLOG_TITLE,
      url: BLOG_URL,
    },
  };

  return (
    <>
      <BackNavigation href="/blog" label="writings" />
      <main className="max-w-xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <article>
          <header className="mb-10">
            <h1 className="text-2xl font-normal leading-tight text-foreground">
              {post.title}
            </h1>
            <time
              dateTime={post.date}
              className="block mt-3 text-xs text-text-muted"
            >
              {formatPostDate(post.date)}
            </time>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              {post.description}
            </p>
          </header>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </main>
    </>
  );
}

