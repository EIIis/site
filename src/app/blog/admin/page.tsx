import Link from "next/link";
import { getServerSession } from "next-auth";
import { BackNavigation } from "@/components/BackNavigation";
import {
  AdminSignInButton,
  AdminSignOutButton,
} from "@/components/blog/AdminAuthActions";
import { AdminDeploymentRefresher } from "@/components/blog/AdminDeploymentRefresher";
import {
  authOptions,
  isAuthConfigured,
  isAuthorizedSession,
} from "@/lib/auth";
import { getAdminPosts } from "@/lib/blog/admin-posts";
import { formatPostDate } from "@/lib/blog/posts";

export const dynamic = "force-dynamic";

interface BlogAdminPageProps {
  searchParams: Promise<{ published?: string | string[] }>;
}

export default async function BlogAdminPage({
  searchParams,
}: BlogAdminPageProps) {
  const authConfigured = isAuthConfigured();
  const session = authConfigured ? await getServerSession(authOptions) : null;
  const authorized = isAuthorizedSession(session);
  const publishedValue = (await searchParams).published;
  const publishedSlug = Array.isArray(publishedValue)
    ? publishedValue[0]
    : publishedValue;
  const dashboard = authorized
    ? await getAdminPosts()
    : { posts: [], repositoryError: undefined };
  const publishedPost = dashboard.posts.find(
    (post) => post.slug === publishedSlug,
  );
  const hasDeployingPosts = dashboard.posts.some(
    (post) => post.status === "deploying",
  );
  const shouldRefresh =
    hasDeployingPosts ||
    Boolean(publishedSlug && publishedPost?.status !== "live");

  return (
    <>
      <BackNavigation href="/blog" label="writings" />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs text-text-muted">protected admin</p>
            <h1 className="mt-2 text-2xl font-normal text-foreground">
              {authorized
                ? "writings admin"
                : authConfigured
                  ? "sign in to publish"
                  : "admin not configured"}
            </h1>
          </div>
          {authorized ? (
            <div className="flex items-center gap-4">
              <Link
                href="/blog/admin/new"
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-border-strong px-4 text-sm text-foreground hover:opacity-60 transition-opacity"
              >
                new writing
              </Link>
              <AdminSignOutButton />
            </div>
          ) : null}
        </div>

        {authorized ? (
          <>
            {publishedSlug ? (
              <p
                className="mt-8 rounded-md border border-border-strong px-4 py-3 text-sm text-text-secondary"
                role="status"
              >
                {publishedPost?.status === "live"
                  ? `${publishedPost.title} is live.`
                  : publishedPost
                    ? `${publishedPost.title} was submitted and is deploying.`
                    : "The article was submitted for deployment."}
              </p>
            ) : null}

            {dashboard.repositoryError ? (
              <p className="mt-8 text-sm text-red-500" role="alert">
                {dashboard.repositoryError}
              </p>
            ) : null}

            {dashboard.posts.length > 0 ? (
              <ol className="mt-8 space-y-3">
                {dashboard.posts.map((post) => {
                  const highlighted = post.slug === publishedSlug;

                  return (
                    <li
                      key={post.slug}
                      className={`rounded-md border p-4 ${
                        highlighted
                          ? "border-border-strong"
                          : "border-border-default"
                      }`}
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                        <div>
                          <h2 className="text-sm text-foreground">
                            {post.title}
                          </h2>
                          <time
                            dateTime={post.date}
                            className="mt-1 block text-xs text-text-muted"
                          >
                            {formatPostDate(post.date)}
                          </time>
                        </div>
                        <span className="shrink-0 text-xs text-text-muted">
                          {post.status}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                        {post.description}
                      </p>
                      {post.status === "live" ? (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-3 inline-block text-xs text-text-muted underline hover:text-foreground transition-colors"
                        >
                          view article
                        </Link>
                      ) : (
                        <p className="mt-3 text-xs text-text-muted">
                          waiting for the latest site deployment…
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="mt-8 text-sm text-text-muted">
                no writings published yet.
              </p>
            )}

            {shouldRefresh ? <AdminDeploymentRefresher /> : null}
          </>
        ) : authConfigured ? (
          <div className="mt-8 max-w-xl">
            <p className="text-sm leading-relaxed text-text-secondary">
              This page is restricted to the configured GitHub account.
            </p>
            <AdminSignInButton />
          </div>
        ) : (
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-text-secondary">
            Add the required server environment variables before using the
            publishing dashboard.
          </p>
        )}
      </main>
    </>
  );
}
