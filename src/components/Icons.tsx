export function BlackFolder({ className = "w-16 h-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 56" fill="none">
      {/* Folder tab */}
      <rect x="4" y="4" width="20" height="8" fill="#000" />
      {/* Main folder body */}
      <rect x="0" y="10" width="64" height="46" fill="#000" />
      {/* Tab curve */}
      <rect x="24" y="4" width="4" height="4" fill="#000" />
      <rect x="28" y="6" width="4" height="4" fill="#000" />
    </svg>
  );
}

export function GrayFolder({ className = "w-16 h-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 56" fill="none">
      <defs>
        <pattern id="checkerGray" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#fff"/>
          <rect width="2" height="2" fill="#999"/>
          <rect x="2" y="2" width="2" height="2" fill="#999"/>
        </pattern>
      </defs>
      {/* Folder tab */}
      <rect x="4" y="4" width="20" height="8" fill="url(#checkerGray)" stroke="#666" strokeWidth="1" />
      {/* Main folder body */}
      <rect x="0" y="10" width="64" height="46" fill="url(#checkerGray)" stroke="#666" strokeWidth="1" />
      {/* Tab curve */}
      <rect x="24" y="4" width="4" height="4" fill="url(#checkerGray)" />
      <rect x="28" y="6" width="4" height="4" fill="url(#checkerGray)" />
    </svg>
  );
}

export function YellowFolder({ className = "w-16 h-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 56" fill="none">
      <defs>
        <pattern id="checkerYellow" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#fff8dc"/>
          <rect width="2" height="2" fill="#f0d000"/>
          <rect x="2" y="2" width="2" height="2" fill="#f0d000"/>
        </pattern>
      </defs>
      {/* Folder tab */}
      <rect x="4" y="4" width="20" height="8" fill="url(#checkerYellow)" stroke="#c0a000" strokeWidth="1" />
      {/* Main folder body */}
      <rect x="0" y="10" width="64" height="46" fill="url(#checkerYellow)" stroke="#c0a000" strokeWidth="1" />
      {/* Tab curve */}
      <rect x="24" y="4" width="4" height="4" fill="url(#checkerYellow)" />
      <rect x="28" y="6" width="4" height="4" fill="url(#checkerYellow)" />
    </svg>
  );
}

export function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
