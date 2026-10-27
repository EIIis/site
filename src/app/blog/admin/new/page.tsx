import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { BackNavigation } from "@/components/BackNavigation";
import { AdminSignOutButton } from "@/components/blog/AdminAuthActions";
import { AdminEditor } from "@/components/blog/AdminEditor";
import {
  authOptions,
  isAuthConfigured,
  isAuthorizedSession,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  if (!isAuthConfigured()) redirect("/blog/admin");

  const session = await getServerSession(authOptions);
  if (!isAuthorizedSession(session)) redirect("/blog/admin");

  return (
    <>
      <BackNavigation href="/blog/admin" label="dashboard" />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-text-muted">protected admin</p>
            <h1 className="mt-2 text-2xl font-normal text-foreground">
              publish a writing
            </h1>
          </div>
          <AdminSignOutButton />
        </div>

        <AdminEditor />
      </main>
    </>
  );
}
