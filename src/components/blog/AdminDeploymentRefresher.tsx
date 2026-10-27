"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const REFRESH_INTERVAL_MS = 10_000;
const REFRESH_DURATION_MS = 5 * 60_000;

export function AdminDeploymentRefresher() {
  const router = useRouter();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      if (Date.now() - startedAt >= REFRESH_DURATION_MS) {
        window.clearInterval(interval);
        setTimedOut(true);
        return;
      }

      router.refresh();
    }, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [router]);

  if (!timedOut) {
    return (
      <p className="mt-6 text-xs text-text-muted" role="status">
        checking deployment status automatically…
      </p>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-xs text-text-muted">
      <p>deployment is taking longer than expected.</p>
      <button
        type="button"
        onClick={() => router.refresh()}
        className="underline hover:text-foreground transition-colors"
      >
        check again
      </button>
    </div>
  );
}
