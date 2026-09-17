"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import Link from "next/link";

interface DraggableFolderProps {
  children: ReactNode;
  href: string;
  label?: string;
  initialX: number;
  initialY: number;
  target?: string;
  rel?: string;
}

export function DraggableFolder({
  children,
  href,
  label,
  initialX,
  initialY,
  target,
  rel,
}: DraggableFolderProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: initialX, y: initialY });
  const positionAtDragStart = useRef({ x: initialX, y: initialY });
  const elementRef = useRef<HTMLDivElement>(null);

  // Load position from localStorage on mount
  useEffect(() => {
    const saved =
      localStorage.getItem(`folder-position-${href}`) ||
      (href === "/work" ? localStorage.getItem("folder-position-/projects") : null);
    if (!saved) return;

    const frame = window.requestAnimationFrame(() => {
      try {
        const parsed = JSON.parse(saved) as { x?: unknown; y?: unknown };
        if (typeof parsed.x !== "number" || typeof parsed.y !== "number") return;
        const restoredPosition = { x: parsed.x, y: parsed.y };
        setPosition(restoredPosition);
        currentPositionRef.current = restoredPosition;
        positionAtDragStart.current = restoredPosition;
      } catch {
        localStorage.removeItem(`folder-position-${href}`);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [href]);

  useEffect(() => {
    if (!isDragging) return;

    const updatePosition = (clientX: number, clientY: number) => {
      const deltaX = clientX - dragStartPos.current.x;
      const deltaY = clientY - dragStartPos.current.y;

      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        setHasDragged(true);
      }

      // Convert pixel delta to percentage delta
      const deltaXPercent = (deltaX / window.innerWidth) * 100;
      const deltaYPercent = (deltaY / window.innerHeight) * 100;

      const nextPosition = {
        x: positionAtDragStart.current.x + deltaXPercent,
        y: positionAtDragStart.current.y + deltaYPercent,
      };

      currentPositionRef.current = nextPosition;
      setPosition(nextPosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleDragEnd = () => {
      localStorage.setItem(
        `folder-position-${href}`,
        JSON.stringify(currentPositionRef.current)
      );
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, href]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    positionAtDragStart.current = { x: position.x, y: position.y };
    setIsDragging(true);
    setHasDragged(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragStartPos.current = { x: touch.clientX, y: touch.clientY };
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
      className="absolute cursor-grab active:cursor-grabbing select-none touch-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <Link
        href={href}
        onClick={handleClick}
        className="flex flex-col items-center gap-1"
        {...(target && { target })}
        {...(rel && { rel })}
      >
        {children}
        {label && (
          <span className="text-xs font-mono text-foreground tracking-wide">
            {label}
          </span>
        )}
      </Link>
    </div>
  );
}
