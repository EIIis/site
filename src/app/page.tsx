import {
  BlackFolder,
  GrayFolder,
  YellowFolder,
  ArrowIcon,
} from "@/components/Icons";
import { DraggableFolder } from "@/components/DraggableFolder";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-50">
        <a
          href="/me"
          className="text-black text-sm font-normal tracking-wide hover:opacity-60"
        >
          about
        </a>
        <a
          href="https://github.com/EIIis"
          className="text-black text-sm font-normal tracking-wide hover:opacity-60 flex items-center gap-1"
        >
          resume <ArrowIcon className="w-3 h-3" />
        </a>
        <a
          href="https://github.com/EIIis"
          className="text-black text-sm font-normal tracking-wide hover:opacity-60"
        >
          github
        </a>
      </nav>

      {/* Draggable Folders Container */}
      <div className="relative w-full h-screen">
        {/* Black folder - top center */}
        <DraggableFolder href="/folder1" initialX={55} initialY={18}>
          <BlackFolder className="w-14 h-12" />
        </DraggableFolder>

        {/* Gray checkered folder - left side */}
        <DraggableFolder href="/folder2" initialX={20} initialY={48}>
          <GrayFolder className="w-14 h-12" />
        </DraggableFolder>

        {/* Yellow folder with label - right side */}
        <DraggableFolder
          href="/nu-thoughts"
          label="nu thoughts"
          initialX={70}
          initialY={48}
        >
          <YellowFolder className="w-14 h-12" />
        </DraggableFolder>

        {/* Photo item - bottom left */}
        <DraggableFolder href="/photo" initialX={28} initialY={75}>
          <div className="w-16 h-16 bg-amber-900 rounded-sm overflow-hidden shadow-md">
            <div className="w-full h-full bg-gradient-to-br from-amber-700 to-amber-900" />
          </div>
        </DraggableFolder>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-6 text-sm text-neutral-500">
        <a
          href="https://www.linkedin.com/in/ellis-alcantara/"
          className="hover:text-black"
        >
          linkedin
        </a>
        <span>/</span>
        <a
          href="https://www.instagram.com/rs.ellis/"
          className="hover:text-black"
        >
          instagram
        </a>
        <span>/</span>
        <a href="https://x.com/bumiing_" className="hover:text-black">
          twitter
        </a>
        <span>/</span>
        <a
          href="https://www.youtube.com/@bum-iing"
          className="hover:text-black"
        >
          youtube
        </a>
      </footer>
    </div>
  );
}
