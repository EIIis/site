import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alcantinez.dev"),
  title: {
    default:
      "Ellis Alcantara - Software Engineer/Product Manager/Technical Program Manager",
    template: "%s | Ellis Alcantara",
  },
  description:
    "Ellis Alcantara is a CS graduate, founder of a stealth company, and software engineer with experience in TPM, QA, and frontend development.",
  authors: [{ name: "Ellis Alcantara", url: "https://alcantinez.dev" }],
  creator: "Ellis Alcantara",
  keywords: [
    "Ellis Alcantara",
    "software engineer",
    "AFK Labs",
    "technical program manager",
    "product",
    "Birmingham AL",
    "full-stack developer",
    "frontend developer",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ellis Alcantara",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@alcantinez",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ellis Alcantara",
  url: "https://alcantinez.dev",
  jobTitle: "Software Engineer/Product Manager/Technical Program Manager",
  description:
    "CS graduate, founder of a stealth company, and software engineer with experience in TPM, QA, and frontend development.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Alabama at Birmingham",
  },
  knowsAbout: [
    "Software Engineering",
    "Technical Program Management",
    "Frontend Development",
    "Quality Assurance",
    "AI Image Generation",
  ],
  sameAs: [
    "https://www.linkedin.com/in/ellisalcantara",
    "https://github.com/EIIis",
    "https://x.com/alcantinez",
    "https://www.instagram.com/rs.ellis",
    "https://www.youtube.com/@alcantinez",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Workday",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ellis Alcantara",
  url: "https://alcantinez.dev",
  description:
    "Personal portfolio of Ellis Alcantara — software engineer, founder, and technical program manager.",
  author: { "@type": "Person", name: "Ellis Alcantara" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
