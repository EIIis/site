import { ThemeToggle } from "./ThemeToggle";

interface SiteFooterProps {
  fixed?: boolean;
}

const SOCIAL_LINKS = [
  { label: "linkedin", href: "https://www.linkedin.com/in/ellisalcantara/" },
  { label: "instagram", href: "https://www.instagram.com/rs.ellis/" },
  { label: "twitter", href: "https://x.com/alcantinez" },
  { label: "youtube", href: "https://www.youtube.com/@alcantinez" },
];

export function SiteFooter({ fixed = false }: SiteFooterProps) {
  return (
    <footer className={`main-footer ${fixed ? "main-footer-fixed" : ""}`}>
      {SOCIAL_LINKS.map((link, index) => (
        <span key={link.href} className="contents">
          {index > 0 ? <span>/</span> : null}
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-fade"
          >
            {link.label}
          </a>
        </span>
      ))}
      <span>/</span>
      <ThemeToggle />
    </footer>
  );
}

