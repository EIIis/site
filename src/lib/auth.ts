import type { NextAuthOptions, Profile, Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

function githubProfileId(profile: Profile | undefined): string | null {
  if (!profile || !("id" in profile)) return null;
  const id = profile.id;
  return typeof id === "string" || typeof id === "number" ? String(id) : null;
}

export function isAllowedGithubId(id: string | null | undefined): boolean {
  const allowedId = process.env.ALLOWED_GITHUB_USER_ID?.trim();
  return Boolean(allowedId && id && id === allowedId);
}

export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.NEXTAUTH_SECRET?.trim() &&
      process.env.GITHUB_CLIENT_ID?.trim() &&
      process.env.GITHUB_CLIENT_SECRET?.trim() &&
      process.env.ALLOWED_GITHUB_USER_ID?.trim(),
  );
}

export function isAuthorizedSession(session: Session | null): boolean {
  return isAllowedGithubId(session?.user?.githubId);
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/blog/admin",
    error: "/blog/admin",
  },
  callbacks: {
    async signIn({ account, profile }) {
      return account?.provider === "github" && isAllowedGithubId(githubProfileId(profile));
    },
    async jwt({ token, profile }) {
      const profileId = githubProfileId(profile);
      if (profileId) token.githubId = profileId;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.githubId = token.githubId;
      return session;
    },
  },
};
