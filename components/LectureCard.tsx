import Link from "next/link";
import type { Lecture } from "@/lib/types";

const ACCENT_CYCLE = ["bg-accent-yellow", "bg-accent-pink", "bg-accent-blue", "bg-accent-green"];

export function LectureCard({ lecture, index = 0 }: { lecture: Lecture; index?: number }) {
  const accent = ACCENT_CYCLE[index % ACCENT_CYCLE.length];
  return (
    <Link
      href={`/lectures/${lecture.slug}`}
      className="group block border-3 border-ink bg-paper shadow-brutal transition-transform hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px]"
    >
      <div className={`border-b-3 border-ink ${accent} px-5 py-3`}>
        <div className="font-display text-xs font-bold uppercase tracking-widest">
          {lecture.date}
        </div>
      </div>
      <div className="p-5">
        <h2 className="font-display text-xl font-bold leading-tight">{lecture.title}</h2>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="brutal-tag bg-paper">강사 {lecture.instructor}</span>
          <span className="brutal-tag bg-muted">{lecture.audience}</span>
        </div>
        {lecture.summary && (
          <p className="mt-4 line-clamp-2 text-sm text-ink/70">{lecture.summary}</p>
        )}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-ink/60">
            링크 {lecture.linkGroups.reduce((s, g) => s + g.links.length, 0)}개
          </span>
          <span className="font-display text-sm font-bold">자세히 보기 →</span>
        </div>
      </div>
    </Link>
  );
}
