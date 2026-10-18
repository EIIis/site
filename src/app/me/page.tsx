import type { Metadata } from "next";
import Image from "next/image";
import { PageLayout } from "@/components";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Ellis Alcantara — CS graduate from Birmingham, AL with experience at Amazon, Expedia, and Workday, and founder of AFK Labs.",
  alternates: { canonical: "/me" },
};

export default function About() {
  return (
    <PageLayout title="about me">
      <div className="mx-auto mb-6 w-full max-w-72 overflow-hidden rounded border border-border-default">
        <Image
          src="/assets/ellis-golden-gate.jpg"
          alt="Ellis Alcantara at the Golden Gate Bridge"
          width={1280}
          height={960}
          priority
          className="aspect-square h-auto w-full object-cover object-[55%_center]"
        />
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
        <p>
          hey! i&apos;m ellis alcantara, a recent cs grad from birmingham, al.
        </p>
        <p>
          currently in the search of new opportunities, hopefully in startups!
          i&apos;ve had professional experience in technical program managment,
          software quality assurance engineering, and front-end development.
        </p>
        <p>
          although i&apos;m also really interested in growth engineering,
          product management, chief of staff roles, and software engineering
          roles.
        </p>
        <p>currently focused on a few things taking up my time:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>My Startup/Growth Hacking</li>
          <li>Personal Tooling Development</li>
          <li>Runescape Related Development</li>
          <li>Automation Tooling</li>
          <li>Startups and Self Development</li>
          <li>Learning (Codings, Leetcode, Math)</li>
          <li>Chasing free compute credits (hmu if you have some lol) </li>
        </ul>
        <p>
          outside of all the stuff i mentioned above (lol) I enjoy watching mma,
          playing with my dogs, botting/playing osrs, and overall just chilling
          :).
        </p>
      </div>
    </PageLayout>
  );
}
