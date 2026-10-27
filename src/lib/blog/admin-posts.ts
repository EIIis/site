import {
  getAllPosts,
  parsePostMarkdown,
  type BlogPostSummary,
} from "./posts";
import {
  listGitHubBlogPostFiles,
  readGitHubBlogPostMarkdown,
} from "./publishing";

export type AdminPostStatus = "deploying" | "live";

export interface AdminBlogPost extends BlogPostSummary {
  status: AdminPostStatus;
}

export interface AdminPostsResult {
  posts: AdminBlogPost[];
  repositoryError?: string;
}

function sortPosts(posts: AdminBlogPost[]): AdminBlogPost[] {
  return posts.sort(
    (a, b) =>
      b.date.localeCompare(a.date) || a.title.localeCompare(b.title),
  );
}

export async function getAdminPosts(): Promise<AdminPostsResult> {
  const livePosts: AdminBlogPost[] = getAllPosts().map((post) => ({
    ...post,
    status: "live",
  }));
  const liveSlugs = new Set(livePosts.map((post) => post.slug));

  try {
    const repositoryFiles = await listGitHubBlogPostFiles();
    const deployingFiles = repositoryFiles.filter(
      (file) => !liveSlugs.has(file.slug),
    );
    const deployingPosts = await Promise.all(
      deployingFiles.map(async (file): Promise<AdminBlogPost> => {
        const markdown = await readGitHubBlogPostMarkdown(file);
        const { summary } = parsePostMarkdown(
          file.slug,
          markdown,
          file.path,
        );

        return { ...summary, status: "deploying" };
      }),
    );

    return { posts: sortPosts([...livePosts, ...deployingPosts]) };
  } catch {
    return {
      posts: sortPosts(livePosts),
      repositoryError:
        "The dashboard could not check GitHub for deploying articles.",
    };
  }
}
