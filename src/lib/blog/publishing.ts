import { BLOG_URL } from "./config";
import { slugifyTitle } from "./slug";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const GITHUB_API_VERSION = "2022-11-28";
const MAX_TITLE_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 280;
const MAX_BODY_LENGTH = 200_000;

export interface BlogPostInput {
  title?: unknown;
  date?: unknown;
  description?: unknown;
  body?: unknown;
}

export interface ValidatedBlogPost {
  title: string;
  date: string;
  description: string;
  body: string;
  slug: string;
  path: string;
  postUrl: string;
}

export interface BlogPostValidation {
  isValid: boolean;
  errors: Partial<Record<"title" | "date" | "description" | "body", string>>;
  data: ValidatedBlogPost;
}

export class BlogPublishingError extends Error {
  constructor(
    message: string,
    public readonly code: "POST_EXISTS" | "CONFIGURATION" | "GITHUB_ERROR",
  ) {
    super(message);
  }
}

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new BlogPublishingError(
      `Missing required environment variable: ${name}`,
      "CONFIGURATION",
    );
  }
  return value;
}

function getGitHubConfig() {
  return {
    token: requiredEnvironmentVariable("GITHUB_CONTENTS_TOKEN"),
    owner: requiredEnvironmentVariable("GITHUB_OWNER"),
    repo: requiredEnvironmentVariable("GITHUB_REPO"),
    branch: requiredEnvironmentVariable("GITHUB_BRANCH"),
  };
}

function normalizeLineEndings(value: string): string {
  return value.replace(/\r\n/g, "\n");
}

function isValidDate(date: string): boolean {
  if (!DATE_PATTERN.test(date)) return false;
  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date
  );
}

export function validatePostInput(input: BlogPostInput): BlogPostValidation {
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const date = typeof input.date === "string" ? input.date.trim() : "";
  const description =
    typeof input.description === "string" ? input.description.trim() : "";
  const body =
    typeof input.body === "string" ? normalizeLineEndings(input.body).trim() : "";
  const slug = slugifyTitle(title);
  const errors: BlogPostValidation["errors"] = {};

  if (!title) errors.title = "Title is required.";
  else if (title.length > MAX_TITLE_LENGTH)
    errors.title = `Title must be ${MAX_TITLE_LENGTH} characters or fewer.`;
  else if (!slug) errors.title = "Title must contain letters or numbers.";

  if (!date) errors.date = "Date is required.";
  else if (!isValidDate(date)) errors.date = "Use a valid YYYY-MM-DD date.";

  if (!description) errors.description = "Description is required.";
  else if (description.length > MAX_DESCRIPTION_LENGTH)
    errors.description = `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  if (!body) errors.body = "Body is required.";
  else if (body.length > MAX_BODY_LENGTH)
    errors.body = "Body is too long.";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: {
      title,
      date,
      description,
      body,
      slug,
      path: slug ? `content/blog/${slug}.md` : "",
      postUrl: slug ? `${BLOG_URL}/${slug}` : "",
    },
  };
}

export function serializePostMarkdown(post: ValidatedBlogPost): string {
  return `---
title: ${JSON.stringify(post.title)}
date: ${JSON.stringify(post.date)}
description: ${JSON.stringify(post.description)}
---

${post.body}
`;
}

function encodeGitHubPath(filePath: string): string {
  return filePath.split("/").map(encodeURIComponent).join("/");
}

async function githubRequest(
  filePath: string,
  init: RequestInit,
  searchParams?: URLSearchParams,
): Promise<Response> {
  const { token, owner, repo } = getGitHubConfig();
  const url = new URL(
    `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodeGitHubPath(filePath)}`,
  );
  if (searchParams) url.search = searchParams.toString();

  return fetch(
    url,
    {
      ...init,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "User-Agent": "alcantinez-portfolio-blog",
        "X-GitHub-Api-Version": GITHUB_API_VERSION,
        ...init.headers,
      },
      cache: "no-store",
    },
  );
}

export async function publishPost(post: ValidatedBlogPost): Promise<void> {
  const { branch } = getGitHubConfig();
  const existing = await githubRequest(post.path, { method: "GET" }, new URLSearchParams({ ref: branch }));

  if (existing.ok) {
    throw new BlogPublishingError(
      "A post with this URL already exists.",
      "POST_EXISTS",
    );
  }

  if (existing.status !== 404) {
    throw new BlogPublishingError(
      "GitHub could not verify whether this post already exists.",
      "GITHUB_ERROR",
    );
  }

  const response = await githubRequest(post.path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `Create writing: ${post.title}`,
      content: Buffer.from(serializePostMarkdown(post), "utf8").toString("base64"),
      branch,
    }),
  });

  if (response.status === 422) {
    throw new BlogPublishingError(
      "A post with this URL already exists.",
      "POST_EXISTS",
    );
  }

  if (!response.ok) {
    throw new BlogPublishingError(
      "GitHub could not publish the post.",
      "GITHUB_ERROR",
    );
  }
}
