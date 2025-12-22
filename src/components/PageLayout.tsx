import { ReactNode } from "react";
import { BackNavigation } from "./BackNavigation";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
}

export function PageLayout({
  title,
  children,
  backHref = "/",
  backLabel = "back",
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <BackNavigation href={backHref} label={backLabel} />
      <main className="max-w-xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <h1 className="text-2xl font-normal mb-8 text-foreground">{title}</h1>
        {children}
      </main>
    </div>
  );
}
