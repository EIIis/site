import Link from "next/link";

interface BackNavigationProps {
  href?: string;
  label?: string;
}

export function BackNavigation({
  href = "/",
  label = "back",
}: BackNavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 px-4 sm:px-6 md:px-8 py-4 sm:py-6 z-50 bg-background/80 backdrop-blur-sm">
      <Link
        href={href}
        className="nav-link"
      >
        ← {label}
      </Link>
    </nav>
  );
}
