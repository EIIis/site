import type { Metadata } from "next";
import { PageLayout, Carousel } from "@/components";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects by Ellis Alcantara including AFK Labs, AI image generation, RuneScape tracking tools, and full-stack web applications.",
  alternates: { canonical: "/projects" },
};

const projects = [
  {
    title: "AFK Labs",
    iconSrc: "/assets/AFK.svg",
    description:
      "Currently building AI image generation for all. You can visit us at afklabs.xyz",
    link: "https://afklabs.xyz",
  },
  {
    title: "X.com Web Scraper + LLM Replies",
    iconSrc: "/assets/xlogo.png",
    description:
      "Basic Playwright scripts to allow a user to login and scrape content from X.com. Also has the ability to connect to a local LLM with Ollama to tweet similar to a user's scraped tweets",
    link: "https://github.com/eiiis/tweet-trainer",
  },
  {
    title: "PolyTrack",
    iconSrc: "/assets/polymarket.png",
    description:
      "Full webapp platform to create list of different Polymarket 'markets' and it's holders and follow market evevnt trends, based on user's value threshold.",
    link: "https://demo.alcantinez.dev/",
  },
  {
    title: "Runescape Tracking",
    iconSrc: "/assets/playertrack.png",
    description:
      "Full stack web application tool for tracking player stats and data. Built with Python, FastAPI, Postgre and hosted on Supabase and Render for the backend. Frontend built with TS, Next.js, Tailwind, and shadcn",
    link: "https://track.alcantinez.dev/",
  },
  {
    title: "OSRS Arbitrage Tool",
    iconSrc: "/assets/flip.png",
    description:
      "Backend tool that would help me find deals on items that would be worth to 'flip'. Takes into account G.E. tax. Built with Python, FastAPI, OSRS Wiki/RuneLite G.E. API, and hosted on Render.",
    link: "https://github.com/EIIis/osrs-arbitrage",
  },
  {
    title: "Oldschool Runescape Development",
    iconSrc: "/assets/runelite.png",
    description:
      "Various automation scripts and utilities. Both using AutoHotKey and RuneLite plug-ins. Built with AutoHotkey and Java, the front-end is built in JS and React.",
    link: "https://eiiis.github.io/ahk/",
  },
  {
    title: "Blog Site",
    iconSrc: "/assets/blog.png",
    description:
      "Personal blog website, I focus on all different types of writing, from personal, technical, rants, it's literally my thoughts. Built with JS, Next.js, Markdown.",
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
