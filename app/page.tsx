import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LectureCard } from "@/components/LectureCard";
import { getAllLectures, getArchiveUpdatedAt } from "@/lib/data";

export default function HomePage() {
  const lectures = getAllLectures();
  const updatedAt = getArchiveUpdatedAt();
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <section className="mb-12 border-3 border-ink bg-accent-pink p-8 shadow-brutal-lg">
          <div className="brutal-tag bg-paper">LECTURE ARCHIVE</div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            김진수 강사의 <br />
            강의 아카이브
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base text-ink/80">
            AICLab의 모든 강의 녹화·자료·참고 링크를 한 곳에서. 수강생에게는 각 강의
            페이지를 공유하세요.
          </p>
          <div className="mt-6 text-xs font-bold uppercase tracking-widest">
            Last updated · {updatedAt}
          </div>
        </section>

        {lectures.length === 0 ? (
          <div className="border-3 border-ink bg-muted p-10 text-center">
            <p className="font-display text-lg">아직 등록된 강의가 없습니다.</p>
            <p className="mt-2 text-sm text-ink/60">
              <code>/admin</code>에서 첫 강의를 추가해보세요.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {lectures.map((lecture, i) => (
              <LectureCard key={lecture.slug} lecture={lecture} index={i} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
