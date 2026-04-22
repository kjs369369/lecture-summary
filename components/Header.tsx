import Link from "next/link";

export function Header({ solo = false }: { solo?: boolean }) {
  if (solo) return null;
  return (
    <header className="border-b-3 border-ink bg-accent-yellow">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl font-bold uppercase tracking-tight">
          📚 Lecture Summary
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/" className="brutal-btn bg-paper text-sm">
            강의 목록
          </Link>
        </nav>
      </div>
    </header>
  );
}
