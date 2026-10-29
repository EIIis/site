import type { Metadata } from "next";
import { PageLayout, Carousel } from "@/components";
import type { WorkItem } from "@/components";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore work by Ellis Alcantara including AFK Labs, InspectBham, AI image generation, and full-stack web applications.",
  alternates: { canonical: "/work" },
};

const workItems: WorkItem[] = [
  {
    title: "AFK Labs",
    iconSrc: "/assets/afk-labs-banner.png",
    description:
      "Independent software studio We build our own products consumer apps and experiments. We build for others. Websites, web apps, mobile apps, and digital products.",
    link: "https://afklabs.xyz",
    linkText: "Come check us out!",
  },
  {
    title: "Statal",
    iconSrc: "/assets/statal-banner-transparent.png",
    imageFit: "cover",
    description:
      "Mobile app built using Swift. All in one health focuused iOS app to track workouts and to track food, including macros.",
    link: "https://apps.apple.com/us/app/statal-gym-workout-tracker/id681436342",
    linkText: "Download on the App Store",
  },
  {
    title: "ImagGen",
    iconSrc: "/assets/imaggen-banner-transparent.png",
    imageFit: "cover",
    description:
      "ImagGen Labs offers image generation powered by AI technology, Stable Diffusion, we utilize custom image models to allow users create the images that they desire",
    link: "https://ai.afklabs.xyz/",
    linkText: "Come check us out!",
  },
  {
    title: "InspectBham",
    iconSrc: "/assets/inspectbham-banner.png",
    imageFit: "cover",
    description:
      "Search and explore Birmingham and Jefferson County restaurant health inspection scores through an interactive map, detailed listings, and rankings.",
    link: "https://inspectbham.afklabs.xyz/",
    linkText: "Explore local food inspection scores!",
  },
  {
    title: "Index Health App",
    iconSrc: "/assets/index-health-logo.svg",
    imageSize: "compact",
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
    title: "OSRS Arbitrage Tool",
    iconSrc: "/assets/flip.png",
    description:
      "Backend tool that would help me find deals on items that would be worth to 'flip'. Takes into account G.E. tax. Built with Python, FastAPI, OSRS Wiki/RuneLite G.E. API, and hosted on Render.",
    link: "https://github.com/EIIis/osrs-arbitrage",
    linkText: "Checkout the repo!",
  },
];

export default function Work() {
  return (
    <PageLayout title="selected work">
      <Carousel items={workItems} />
    </PageLayout>
  );
}
