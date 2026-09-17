import { BLOG_DESCRIPTION, BLOG_TITLE, BLOG_URL } from "@/lib/blog/config";
import { getAllPosts } from "@/lib/blog/posts";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = getAllPosts()
    .map((post) => {
      const postUrl = `${BLOG_URL}/${post.slug}`;
      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${postUrl}</link>
  <description>${escapeXml(post.description)}</description>
  <pubDate>${new Date(`${post.date}T00:00:00.000Z`).toUTCString()}</pubDate>
  <guid isPermaLink="true">${postUrl}</guid>
</item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(BLOG_TITLE)}</title>
  <link>${BLOG_URL}</link>
  <description>${escapeXml(BLOG_DESCRIPTION)}</description>
  <language>en-us</language>
  <atom:link href="${BLOG_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

