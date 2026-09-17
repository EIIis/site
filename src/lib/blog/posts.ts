import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdownToHtml } from "./markdown";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface BlogPostSummary {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface BlogPost extends BlogPostSummary {
  contentHtml: string;
}

function isValidDate(date: string): boolean {
  if (!DATE_PATTERN.test(date)) return false;

  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date
  );
}

function readPostFile(fileName: string): {
  summary: BlogPostSummary;
  body: string;
} {
  const slug = fileName.replace(/\.md$/, "");

  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      `Invalid blog slug "${slug}". Use lowercase letters, numbers, and hyphens.`,
    );
  }

  const fullPath = path.join(BLOG_DIRECTORY, fileName);
  const parsed = matter(fs.readFileSync(fullPath, "utf8"));
  const title = typeof parsed.data.title === "string" ? parsed.data.title.trim() : "";
  const date = typeof parsed.data.date === "string" ? parsed.data.date.trim() : "";
  const description =
    typeof parsed.data.description === "string"
      ? parsed.data.description.trim()
      : "";

  if (!title || !description || !isValidDate(date)) {
    throw new Error(
      `Invalid frontmatter in content/blog/${fileName}. Title, description, and a valid YYYY-MM-DD date are required.`,
    );
  }

  return {
    summary: { slug, title, date, description },
    body: parsed.content,
  };
}

function getPostFileNames(): string[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) return [];

  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md"));
}

export function getAllPosts(): BlogPostSummary[] {
  return getPostFileNames()
    .map((fileName) => readPostFile(fileName).summary)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!SLUG_PATTERN.test(slug)) return null;

  const fileName = `${slug}.md`;
  if (!getPostFileNames().includes(fileName)) return null;

  const { summary, body } = readPostFile(fileName);
  return {
    ...summary,
    contentHtml: renderMarkdownToHtml(body),
  };
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

