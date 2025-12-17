import Link from "next/link";
import { Carousel } from "@/components/Carousel";

const projects = [
  {
    title: "RuneLite Plugin",
    description:
      "Custom plugins and automation scripts for Old School RuneScape.",
    link: "https://github.com/EIIis/equipment-check",
  },
  {
    title: "Image Generation",
    description: "Experiments with Stable Diffusion for AI image generation.",
    link: "",
  },
  {
    title: "Runescape Tracking",
    description: "Tools for tracking player stats and game data.",
    link: "https://github.com/EIIis/player-tracker",
  },
  {
    title: "Arbitrage Tooling",
    description: "Automated tools for identifying arbitrage opportunities.",
    link: "",
  },
  {
    title: "Automation Tooling",
    description: "Various automation scripts and utilities.",
    link: "",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back navigation */}
      <nav className="fixed top-0 left-0 right-0 px-8 py-6 z-50">
        <Link
          href="/"
          className="text-black text-sm font-normal tracking-wide hover:opacity-60"
        >
          ← back
        </Link>
      </nav>

      {/* Content */}
      <main className="max-w-xl mx-auto px-8 pt-24 pb-16">
        <h1 className="text-2xl font-normal mb-8">projects</h1>

        <Carousel projects={projects} />
      </main>
    </div>
  );
}
