import { SiteFooter } from "@/components/SiteFooter";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}

