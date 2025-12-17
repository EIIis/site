import { ReactNode } from "react";

interface Job {
  logo?: ReactNode;
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
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-200" />

      <div className="space-y-8">
        {jobs.map((job, index) => (
          <div key={index} className="relative pl-8">
            {/* Dot marker */}
            <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 border-neutral-300 bg-white" />

            {/* Logo box */}
            {job.logo && (
              <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center mb-2">
                {job.logo}
              </div>
            )}

            {/* Content */}
            <div>
              <h3 className="text-sm font-medium text-black">{job.company}</h3>
              <p className="text-sm text-black">{job.role}</p>
              <p className="text-xs text-neutral-400 mt-1">
                {job.date} // {job.location}
              </p>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                {job.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
