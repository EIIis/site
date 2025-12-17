import Link from "next/link";
import { Timeline } from "@/components/Timeline";

const jobs = [
  {
    company: "Workday",
    role: "Technical Program Manager Intern",
    date: "may 2024 - aug 2024",
    location: "atlanta, georgia",
    description: "Description of your work and accomplishments.",
  },
  {
    company: "University of Alabama at Birmingham",
    role: "Data Analyst Intern",
    date: "jan 2024 - april 2024",
    location: "birmingham, alabama",
    description: "Description of your work and accomplishments.",
  },
  {
    company: "Expedia Group",
    role: "Technical Program Manager Intern",
    date: "may 2023 - july 2023",
    location: "seattle, washington",
    description: "Description of your work and accomplishments.",
  },
  {
    company: "Amazon Lab126",
    role: "Software Quality Asurance Engineer",
    date: "may 2022 - aug 2023",
    location: "sunnyvale, california",
    description: "Description of your work and accomplishments.",
  },
  {
    company: "HiveRnD",
    role: "Software Engineer",
    date: "may 2021 - july 2021",
    location: "remote",
    description: "Description of your work and accomplishments.",
  },
];

export default function Experience() {
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
        <h1 className="text-2xl font-normal mb-8">experience</h1>

        <Timeline jobs={jobs} />
      </main>
    </div>
  );
}
