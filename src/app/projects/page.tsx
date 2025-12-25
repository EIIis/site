import { PageLayout, Carousel } from "@/components";

const projects = [
  {
    title: "AFK Labs",
    iconSrc: "/assets/potion.png",
    description:
      "Building AI suported image generation. You can visit us at afklabs.xyz",
    link: "https://afklabs.xyz",
  },
  {
    title: "Image Generation Engine",
    iconSrc: "/assets/potion.png",
    description: "Experiments with Stable Diffusion for AI image generation.",
    link: "https://ai.afklabs.xyz",
  },
  {
    title: "Runescape Tracking",
    iconSrc: "/assets/potion.png",
    description:
      "Full stack web application tool for tracking player stats and data. Built with Python, FastAPI, Postgre and hosted on Supabase and Render for the backend. Frontend built with TS, Next.js, Tailwind, and shadcn",
    link: "https://track.alcantinez.dev/",
  },
  {
    title: "OSRS Arbitrage Tool",
    iconSrc: "/assets/potion.png",
    description:
      "Backend tool that would help me find deals on items that would be worth to 'flip'. Takes into account G.E. tax. Built with Python, FastAPI, OSRS Wiki/RuneLite G.E. API, and hosted on Render.",
    link: "https://github.com/EIIis/osrs-arbitrage",
  },
  {
    title: "Oldschool Runescape Development",
    iconSrc: "/assets/potion.png",
    description:
      "Various automation scripts and utilities. Both using AutoHotKey and RuneLite plug-ins. Built with AutoHotkey and Java, the front-end is built in JS and React.",
    link: "https://eiiis.github.io/ahk/",
  },
  {
    title: "Blog Site",
    iconSrc: "/assets/potion.png",
    description:
      "Personal log website, I focus on all different types of writing, from personal, technical, rants, it's literally my thoughts. Built with JS, Next.js, Markdown.",
    link: "https://demo.alcantinez.dev/",
  },
];

export default function Projects() {
  return (
    <PageLayout title="projects">
      <Carousel projects={projects} />
    </PageLayout>
  );
}
