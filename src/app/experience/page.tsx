import Link from "next/link";

export default function Experience() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back navigation */}
      <nav className="fixed top-0 left-0 right-0 px-8 py-6 z-50">
        <Link
          href="/"
          className="text-black text-sm font-normal tracking-wide hover:opacity-60"
        >
          ← back
        </Link>
      </nav>

      {/* Content */}
      <main className="max-w-xl mx-auto px-8 pt-24 pb-16">
        <h1 className="text-2xl font-normal mb-8">experience</h1>

        <div className="space-y-4 text-sm leading-relaxed text-neutral-700"></div>
      </main>
    </div>
  );
}
