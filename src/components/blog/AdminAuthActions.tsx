"use client";

import { signIn, signOut } from "next-auth/react";

export function AdminSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("github", { callbackUrl: "/blog/admin" })}
      className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md border border-border-strong px-4 text-sm text-foreground hover:opacity-60 transition-opacity"
    >
      continue with github
    </button>
  );
}

export function AdminSignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/blog/admin" })}
      className="text-xs text-text-muted hover:text-foreground transition-colors"
    >
      sign out
    </button>
  );
}

