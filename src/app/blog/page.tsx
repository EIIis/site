import type { Metadata } from "next";
import Link from "next/link";
import { BackNavigation } from "@/components/BackNavigation";
import { BLOG_DESCRIPTION, BLOG_TITLE } from "@/lib/blog/config";
import { formatPostDate, getAllPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
  openGraph: {
    type: "website",
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <BackNavigation href="/" label="home" />
      <main className="max-w-xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <header className="mb-10">
          <h1 className="text-2xl font-normal text-foreground">writings</h1>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            occasional notes on software, projects, and life.
          </p>
        </header>

        {posts.length > 0 ? (
          <ol className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h2 className="text-sm text-foreground group-hover:opacity-60 transition-opacity">
                      {post.title}
                    </h2>
                    <time
                      dateTime={post.date}
                      className="shrink-0 text-xs text-text-muted"
                    >
                      {formatPostDate(post.date)}
                    </time>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {post.description}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-text-muted">nothing here yet.</p>
        )}
      </main>
    </>
  );
}
