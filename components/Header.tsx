"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export function Header({ solo = false }: { solo?: boolean }) {
  const router = useRouter();
  const clickCountRef = useRef(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (solo) return null;

  const handleListClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    clickCountRef.current += 1;

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1500);

    if (clickCountRef.current >= 3) {
      e.preventDefault();
      clickCountRef.current = 0;
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      router.push("/admin");
    }
  };

  return (
    <header className="border-b-3 border-ink bg-accent-yellow">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl font-bold uppercase tracking-tight"
        >
          📚 Lecture Summary
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            href="/"
            onClick={handleListClick}
            className="brutal-btn bg-paper text-sm select-none"
            aria-label="강의 목록 (3회 클릭 시 관리자)"
          >
            강의 목록
          </Link>
        </nav>
      </div>
    </header>
  );
}
