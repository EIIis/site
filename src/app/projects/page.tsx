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
    description: "Tools for tracking player stats and game data.",
    link: "https://github.com/EIIis/player-tracker",
  },
  {
    title: "OSRS Arbitrage Tool",
    iconSrc: "/assets/potion.png",
    description:
      "Backend tool that would help me find deals on items that would be worth to 'flip'. Takes into account tax.",
    link: "https://github.com/EIIis/osrs-arbitrage",
  },
  {
    title: "RuneLite Equipment Check Plugin",
    iconSrc: "/assets/potion.png",
    description: "Various automation scripts and utilities.",
    link: "https://github.com/EIIis/equipment-check",
  },
  {
    title: "Blog Site",
    iconSrc: "/assets/potion.png",
    description: "Various automation scripts and utilities.",
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
