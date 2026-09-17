import type { Metadata } from "next";
import { PageLayout, Carousel } from "@/components";
import type { WorkItem } from "@/components";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore work by Ellis Alcantara including AFK Labs, AI image generation, RuneScape tracking tools, and full-stack web applications.",
  alternates: { canonical: "/work" },
};

const workItems: WorkItem[] = [
  {
    title: "AFK Labs",
    iconSrc: "/assets/AFK.svg",
    description:
      "Independent software studio We build our own products consumer apps and experiments. We build for others. Websites, web apps, mobile apps, and digital products.",
    link: "https://afklabs.xyz",
    linkText: "Come check us out!",
  },
  {
    title: "Statal",
    iconSrc: "/assets/xlogo.png",
    description:
      "Mobile app built using Swift. All in one health focuused iOS app to track workouts and to track food, including macros.",
    link: "https://youtu.be/gMNLMhKyKaU?si=vCSKL2Ecoe2zAG0-",
  },
  {
    title: "Index Health App",
    iconSrc: "/assets/xlogo.png",
    description:
      "Mobile app built using React Native. Helps users navigate their preventive health journey.",
    link: "https://youtu.be/gMNLMhKyKaU?si=vCSKL2Ecoe2zAG0-",
    linkText: "MVP demo video I did for YCombinator!",
  },
  {
    title: "X.com Web Scraper + LLM Replies",
    iconSrc: "/assets/xlogo.png",
    description:
      "Basic Playwright scripts to allow a user to login and scrape content from X.com. Also has the ability to connect to a local LLM with Ollama to tweet similar to a user's scraped tweets",
    link: "https://github.com/eiiis/tweet-trainer",
    linkText: "Checkout the repo!",
  },
  {
    title: "PolyTrack",
    iconSrc: "/assets/polymarket.png",
    description:
      "Full webapp platform to create list of different Polymarket 'markets' and it's holders and follow market evevnt trends, based on user's value threshold.",
    link: "https://polytrack.afklabs.xyz/",
    linkText: "Closed beta. Contact if interested!",
  },
  {
    title: "OSRS Arbitrage Tool",
    iconSrc: "/assets/flip.png",
    description:
      "Backend tool that would help me find deals on items that would be worth to 'flip'. Takes into account G.E. tax. Built with Python, FastAPI, OSRS Wiki/RuneLite G.E. API, and hosted on Render.",
    link: "https://github.com/EIIis/osrs-arbitrage",
    linkText: "Checkout the repo!",
  },
  {
    title: "ImagGen Labs",
    iconSrc: "/assets/runelite.png",
    description:
      "ImagGen Labs offers image generation powered by AI technology, Stable Diffusion, we utilize custom image models to allow users create the images that they desire",
    link: "https://ai.afklabs.xyz/",
    linkText: "Come check us out!",
  },
];

export default function Work() {
  return (
    <PageLayout title="selected work">
      <Carousel items={workItems} />
    </PageLayout>
  );
}
