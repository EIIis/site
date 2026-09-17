import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { BackNavigation } from "@/components/BackNavigation";
import {
  AdminSignInButton,
  AdminSignOutButton,
} from "@/components/blog/AdminAuthActions";
import { AdminEditor } from "@/components/blog/AdminEditor";
import {
  authOptions,
  isAuthConfigured,
  isAuthorizedSession,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing Admin",
  robots: { index: false, follow: false, noarchive: true },
};

export default async function BlogAdminPage() {
  const authConfigured = isAuthConfigured();
  const session = authConfigured ? await getServerSession(authOptions) : null;
  const authorized = isAuthorizedSession(session);

  return (
    <>
      <BackNavigation href="/blog" label="writings" />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-text-muted">protected admin</p>
            <h1 className="mt-2 text-2xl font-normal text-foreground">
              {authorized
                ? "publish a writing"
                : authConfigured
                  ? "sign in to publish"
                  : "admin not configured"}
            </h1>
          </div>
          {authorized ? <AdminSignOutButton /> : null}
        </div>

        {authorized ? (
          <AdminEditor />
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
