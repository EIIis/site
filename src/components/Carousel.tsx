"use client";

import { useState, ReactNode } from "react";

interface Project {
  title: string;
  description: string;
  link?: string;
  icon?: ReactNode;
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
    return <p className="text-neutral-500">No projects yet.</p>;
  }

  const project = projects[currentIndex];

  return (
    <div className="w-full">
      {/* Project Card */}
      <div className="border border-neutral-200 p-6 min-h-[200px]">
        <h2 className="text-lg font-normal mb-3">{project.title}</h2>
        {/* Icon Box */}
        <div className="w-12 h-12 border border-neutral-200 flex items-center justify-center mb-3">
          {project.icon}
        </div>
        <p className="text-neutral-600 text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <a
          href={project.link || "https://github.com/EIIis"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-black underline hover:opacity-60"
        >
          link project
        </a>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goToPrevious}
          className="text-sm text-black hover:opacity-60 px-3 py-1"
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
                index === currentIndex ? "bg-black" : "bg-neutral-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="text-sm text-black hover:opacity-60 px-3 py-1"
        >
          next →
        </button>
      </div>
    </div>
  );
}
