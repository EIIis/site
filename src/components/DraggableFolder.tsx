"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import Link from "next/link";

interface DraggableFolderProps {
  children: ReactNode;
  href: string;
  label?: string;
  initialX: number;
  initialY: number;
}

export function DraggableFolder({
  children,
  href,
  label,
  initialX,
  initialY,
}: DraggableFolderProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const positionAtDragStart = useRef({ x: initialX, y: initialY });
  const elementRef = useRef<HTMLDivElement>(null);

  // Load position from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`folder-position-${href}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setPosition(parsed);
      positionAtDragStart.current = parsed;
    }
  }, [href]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        setHasDragged(true);
      }

      // Convert pixel delta to percentage delta
      const deltaXPercent = (deltaX / window.innerWidth) * 100;
      const deltaYPercent = (deltaY / window.innerHeight) * 100;

      setPosition({
        x: positionAtDragStart.current.x + deltaXPercent,
        y: positionAtDragStart.current.y + deltaYPercent,
      });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        // Save position to localStorage
        localStorage.setItem(`folder-position-${href}`, JSON.stringify(position));
      }
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, href, position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    positionAtDragStart.current = { x: position.x, y: position.y };
    setIsDragging(true);
    setHasDragged(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
    }
  };

  return (
    <div
      ref={elementRef}
      className="absolute cursor-grab active:cursor-grabbing select-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseDown={handleMouseDown}
    >
      <Link
        href={href}
        onClick={handleClick}
        className="flex flex-col items-center gap-1"
      >
        {children}
        {label && (
          <span className="text-xs font-mono text-black tracking-wide">
            {label}
          </span>
        )}
      </Link>
    </div>
  );
}
