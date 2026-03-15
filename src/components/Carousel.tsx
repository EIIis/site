"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "./Card";

interface Project {
  title: string;
  description: string;
  link?: string;
  iconSrc?: string;
}

interface CarouselProps {
  projects: Project[];
}

export function Carousel({ projects }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  if (projects.length === 0) {
    return <p className="text-text-secondary">No projects yet.</p>;
  }

  const project = projects[currentIndex];

  return (
    <div className="w-full">
      {/* Project Card */}
      <Card className="min-h-[200px] flex flex-col items-center text-center">
        <h2 className="text-lg font-normal mb-3 text-foreground">
          {project.title}
        </h2>
        {project.iconSrc && (
          <div className="w-full max-h-[160px] overflow-hidden rounded border border-border-default mb-3">
            <Image
              src={project.iconSrc}
              alt={`${project.title} preview`}
              width={400}
              height={160}
              className="w-full h-auto object-contain"
            />
          </div>
        )}
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <a
          href={project.link || "https://github.com/EIIis"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-foreground underline hover-fade"
        >
          click to check it out :)
        </a>
      </Card>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goToPrevious}
          className="text-sm text-foreground hover-fade px-3 py-1"
        >
          ← prev
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-foreground" : "bg-border-strong"
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="text-sm text-foreground hover-fade px-3 py-1"
        >
          next →
        </button>
      </div>
    </div>
  );
}
