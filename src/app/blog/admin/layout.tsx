import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing Admin",
  robots: { index: false, follow: false, noarchive: true },
};

export default function BlogAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
