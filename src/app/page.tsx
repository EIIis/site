import type { Metadata } from "next";
import Image from "next/image";
import { ArrowIcon } from "@/components/Icons";
import { DraggableFolder } from "@/components/DraggableFolder";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <h1 className="sr-only">
        Ellis Alcantara - software engineer, founder, product manager, and
        technical program manager
      </h1>

      {/* Navigation */}
      <nav className="main-nav">
        <a href="/me" className="nav-link">
          about me
        </a>
        <a href="https://alcantinez.dev/" className="nav-link">
          ellis alcantara
        </a>
        <a
          href="/assets/EllisAlcantara.pdf"
          download="EllisAlcantara_Resume.pdf"
          className="nav-link flex items-center gap-1"
        >
          resume <ArrowIcon className="w-3 h-3 rotate-90" />
        </a>
      </nav>

      {/* Draggable Folders Container */}
      <div className="relative w-full h-screen">
        {/* AFK folder - top center */}
        <DraggableFolder
          href="https://music.youtube.com/playlist?list=PLKRzYo1agH9ykQyYcQzmt_5OERShZJs5Y&si=lkACUnRFZB3YDmUl"
          label="music"
          initialX={55}
          initialY={18}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-14 h-12 flex items-center justify-center">
            <Image
              src="/assets/music.png"
              alt="Music folder"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </DraggableFolder>

        {/* AFK folder - left side */}
        <DraggableFolder
          href="/experience"
          label="experience"
          initialX={20}
          initialY={48}
        >
          <div className="w-14 h-12 flex items-center justify-center">
            <Image
              src="/assets/skill.png"
              alt="Experience folder"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </DraggableFolder>

        {/* AFK folder - right side */}
        <DraggableFolder
          href="/projects"
          label="projects"
          initialX={70}
          initialY={48}
        >
          <div className="w-14 h-12 flex items-center justify-center">
            <Image
              src="/assets/tool.png"
              alt="Projects folder"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </DraggableFolder>

        {/* AFK folder - bottom left */}
        <DraggableFolder
          href="https://blog.alcantinez.dev/"
          label="writings"
          initialX={28}
          initialY={75}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-14 h-12 flex items-center justify-center">
            <Image
              src="/assets/book.png"
              alt="Writings folder"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </DraggableFolder>

        {/* AFK folder - bottom right */}
        <DraggableFolder
          href="https://github.com/EIIis"
          label="github"
          initialX={50}
          initialY={62}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-14 h-12 flex items-center justify-center">
            <Image
              src="/assets/github.png"
              alt="Github folder"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </DraggableFolder>
      </div>

      {/* Footer */}
      <footer className="main-footer">
        <a
          href="https://www.linkedin.com/in/ellis-alcantara/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-fade"
        >
          linkedin
        </a>
        <span>/</span>
        <a
          href="https://www.instagram.com/rs.ellis/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-fade"
        >
          instagram
        </a>
        <span>/</span>
        <a
          href="https://x.com/alcantinez"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-fade"
        >
          twitter
        </a>
        <span>/</span>
        <a
          href="https://www.youtube.com/@alcantinez"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-fade"
        >
          youtube
        </a>
        <span>/</span>
        <ThemeToggle />
      </footer>
    </div>
  );
}
