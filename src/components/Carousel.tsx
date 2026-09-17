"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "./Card";

export interface WorkItem {
  title: string;
  description: string;
  link?: string;
  iconSrc?: string;
  linkText?: string;
}

export type Project = WorkItem;

interface CarouselProps {
  items?: WorkItem[];
  projects?: WorkItem[];
}

export function Carousel({ items, projects }: CarouselProps) {
  const workItems = items ?? projects ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? workItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === workItems.length - 1 ? 0 : prev + 1));
  };

  if (workItems.length === 0) {
    return <p className="text-text-secondary">No work yet.</p>;
  }

  const currentItem = workItems[currentIndex];

  return (
    <div className="w-full">
      {/* Work Card */}
      <Card className="h-[420px] w-full flex flex-col items-center text-center">
        <div className="w-full h-14 flex items-center justify-center mb-3">
          <h2 className="text-lg font-normal text-foreground line-clamp-2">
            {currentItem.title}
          </h2>
        </div>
        {currentItem.iconSrc && (
          <div className="w-full h-[160px] overflow-hidden rounded border border-border-default mb-3 flex items-center justify-center bg-background">
            <Image
              src={currentItem.iconSrc}
              alt={`${currentItem.title} preview`}
              width={400}
              height={160}
              className="w-full h-full object-contain p-2"
            />
          </div>
        )}
        <div className="w-full h-24 mb-4 text-center overflow-hidden">
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-4">
            {currentItem.description}
          </p>
        </div>
        {currentItem.link && currentItem.linkText ? (
          <a
            href={currentItem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground underline hover-fade mt-auto"
          >
            {currentItem.linkText}
          </a>
        ) : (
          <span className="text-sm text-text-secondary mt-auto cursor-default select-none">
            {currentItem.linkText || "Demo/Public Repo coming soon!"}
          </span>
        )}
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
          {workItems.map((_, index) => (
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
