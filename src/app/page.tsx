import Image from "next/image";
import { ArrowIcon } from "@/components/Icons";
import { DraggableFolder } from "@/components/DraggableFolder";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-6 z-50 gap-2 sm:gap-0 bg-background/80 backdrop-blur-sm">
        <a
          href="/me"
          className="text-foreground text-sm font-normal tracking-wide hover:opacity-60 transition-opacity"
        >
          about me
        </a>
        <a
          href="https://alcantinez.dev/"
          className="text-foreground text-sm font-normal tracking-wide hover:opacity-60 transition-opacity"
        >
          ellis alcantara
        </a>
        <a
          href="/assets/EllisAlcantara.pdf"
          download="EllisAlcantara_Resume.pdf"
          className="text-foreground text-sm font-normal tracking-wide hover:opacity-60 transition-opacity flex items-center gap-1"
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
          href="https://ellis-demoblog.vercel.app/"
          label="writings"
          initialX={28}
          initialY={75}
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
        >
          <div className="w-14 h-12 flex items-center justify-center">
            <Image
              src="/assets/afk.svg"
              alt="Github folder"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </DraggableFolder>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 flex flex-wrap items-center justify-center gap-2 py-4 sm:py-6 text-xs sm:text-sm text-text-secondary bg-background/80 backdrop-blur-sm">
        <a
          href="https://www.linkedin.com/in/ellis-alcantara/"
          className="hover:opacity-60 transition-opacity"
        >
          linkedin
        </a>
        <span>/</span>
        <a
          href="https://www.instagram.com/rs.ellis/"
          className="hover:opacity-60 transition-opacity"
        >
          instagram
        </a>
        <span>/</span>
        <a
          href="https://x.com/alcantinez"
          className="hover:opacity-60 transition-opacity"
        >
          twitter
        </a>
        <span>/</span>
        <a
          href="https://www.youtube.com/@alcantinez"
          className="hover:opacity-60 transition-opacity"
        >
          youtube
        </a>
        <span>/</span>
        <ThemeToggle />
      </footer>
    </div>
  );
}
