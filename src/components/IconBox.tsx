import { ReactNode } from "react";
import Image from "next/image";

interface IconBoxProps {
  children?: ReactNode;
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function IconBox({
  children,
  src,
  alt = "icon",
  size = "md",
  className = "",
}: IconBoxProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const imageSizes = {
    sm: 20,
    md: 24,
    lg: 28,
  };

  return (
    <div
      className={`${sizeClasses[size]} border border-border-default flex items-center justify-center bg-background ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={imageSizes[size]}
          height={imageSizes[size]}
          className="object-contain"
        />
      ) : (
        children
      )}
    </div>
  );
}
