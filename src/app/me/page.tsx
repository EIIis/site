import Link from "next/link";

export default function About() {
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
        <h1 className="text-2xl font-normal mb-8">about me</h1>

        <div className="space-y-4 text-sm leading-relaxed text-neutral-700">
          <p>hey! i'm ellis alcantara, a recent cs grad from birmingham, al.</p>
          <p>
            currently in the search of new opporunties, hopefully in startups!
            i've had professional experience in technical program managment,
            software quality assurance engineering, and front-end development.
          </p>
          <p>
            although i'm also really interested in growth engineering, product
            management, chief of staff roles, and software engineering roles.
          </p>
          <p>currently working on a few projects that have taken up my time:</p>
          <li>RuneLite Plugin and OSMB Script Development</li>
          <li>Image Generation Using Stable Diffusion</li>
          <li>Runescape Tracking Projects</li>
          <li>Arbitrage Tooling</li> <li>Automation Tooling</li>
          <li>Startups and Self Development</li>
          <li>Learning (Codings, Leetcode, Math)</li>
          <p>
            outside of all the stuff i mentioned above (lol) I enjoy watching
            mma, playing with my dogs, botting/playing osrs, and overall just
            chilling :).
          </p>
        </div>
      </main>
    </div>
  );
}
