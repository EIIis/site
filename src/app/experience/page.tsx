import type { Metadata } from "next";
import { PageLayout, Timeline } from "@/components";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Ellis Alcantara's professional experience — founder of a startup, Workday, Expedia, and Amazon Lab126.",
  alternates: { canonical: "/experience" },
};

const jobs = [
  {
    company: "Index Health",
    role: "Co-Founder / CTO ",
    date: "april 2026 - current",
    location: "remote",
    // description: "Creating consumer web tooling. Make that out as you will lol",
  },
  {
    company: "AFK Labs",
    role: "Founder",
    date: "dec 2025 - current",
    location: "remote",
    // description: "Creating consumer web tooling. Make that out as you will lol",
  },
  {
    company: "Workday",
    role: "Software",
    date: "may 2024 - aug 2024",
    location: "atlanta, georgia",
    // description:
    //   "Technical program manager working in the Product & Technology Strategy and Planning Organization assigned to the Infrastructure Public Cloud Engineering App program.",
  },
  {
    company: "University of Alabama at Birmingham - Department of Physics",
    role: "Data Analyst",
    date: "jan 2024 - april 2024",
    location: "birmingham, alabama",
    // description:
    //   "Assigned to a local company (mine was SARCOR LLC) to implement a data-viz tool. Built a tool leverging PowerBI to breakdown utility companies by county.",
  },
  {
    company: "Expedia Group",
    role: "Software",
    date: "may 2023 - july 2023",
    location: "seattle, washington",
    // description:
    //   "Technical program manager who collaborated with the Strategic Initiatives Program Management team on rolling out One Identity and One Key.",
  },
  {
    company: "Amazon Lab126",
    role: "Software",
    date: "may 2022 - aug 2023",
    location: "sunnyvale, california",
    // description:
    //   "Software QA engineer who designed and implemented a scalable framework in Python for the Amazon Astro robotics platform, enabling validation of hardware-software integration for consumer accessories.",
  },
  {
    company: "HiveRnD",
    role: "Software",
    date: "may 2021 - july 2021",
    location: "remote",
    // description:
    //   "Drontend developer where I developed key web pages including user profiles and registration flows using TypeScript, React, Node.js, and Chakra UI",
  },
];

export default function Experience() {
  return (
    <PageLayout title="experience">
      <Timeline jobs={jobs} />
    </PageLayout>
  );
}
