import { ReactNode } from "react";
import { IconBox } from "./IconBox";

interface Job {
  logo?: ReactNode;
  logoSrc?: string;
  company: string;
  role: string;
  date: string;
  location: string;
  description: string;
}

interface TimelineProps {
  jobs: Job[];
}

export function Timeline({ jobs }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border-default" />

      <div className="space-y-8">
        {jobs.map((job, index) => (
          <div key={index} className="relative pl-8">
            {/* Dot marker */}
            <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 border-border-strong bg-background" />

            {/* Logo box */}
            {(job.logo || job.logoSrc) && (
              <IconBox
                src={job.logoSrc}
                alt={`${job.company} logo`}
                size="md"
                className="mb-2"
              >
                {job.logo}
              </IconBox>
            )}

            {/* Content */}
            <div>
              <h3 className="text-sm font-medium text-foreground">
                {job.company}
              </h3>
              <p className="text-sm text-foreground">{job.role}</p>
              <p className="text-xs text-text-muted mt-1">
                {job.date} // {job.location}
              </p>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                {job.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
