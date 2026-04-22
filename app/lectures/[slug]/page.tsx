import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LinkCard } from "@/components/LinkCard";
import { getAllLectures, getLectureBySlug } from "@/lib/data";

export function generateStaticParams() {
  return getAllLectures().map((l) => ({ slug: l.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const lecture = getLectureBySlug(params.slug);
  if (!lecture) return {};
  const title = `${lecture.title} | Lecture Summary`;
  const description =
    lecture.summary ??
    `${lecture.date} · 강사 ${lecture.instructor} · 대상 ${lecture.audience}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/lectures/${lecture.slug}`,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default function LecturePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { solo?: string };
}) {
  const lecture = getLectureBySlug(params.slug);
  if (!lecture) notFound();

  const solo = searchParams.solo === "1";

  return (
    <>
      <Header solo={solo} />
      <main className="mx-auto max-w-4xl px-6 py-10">
        {!solo && (
          <Link
            href="/"
            className="inline-block mb-6 text-sm font-bold uppercase tracking-widest underline decoration-2 underline-offset-4"
          >
            ← 전체 강의 목록
          </Link>
        )}

        <section className="border-3 border-ink bg-accent-yellow p-8 shadow-brutal-lg">
          <div className="flex flex-wrap gap-2">
            <span className="brutal-tag bg-paper">{lecture.date}</span>
            <span className="brutal-tag bg-paper">강사 {lecture.instructor}</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
            {lecture.title}
          </h1>
          <p className="mt-4 font-body text-base text-ink/80">
            <span className="font-bold">대상 ·</span> {lecture.audience}
          </p>
          {lecture.summary && (
            <p className="mt-4 border-t-3 border-ink/20 pt-4 font-body text-base">
              {lecture.summary}
            </p>
          )}
        </section>

        {lecture.recording && (
          <section className="mt-8">
            <h2 className="font-display text-2xl font-bold">🎥 녹화본</h2>
            <div className="mt-3 border-3 border-ink bg-paper p-5 shadow-brutal">
              <a
                href={lecture.recording.url}
                target="_blank"
                rel="noreferrer"
                className="break-all font-bold underline"
              >
                {lecture.recording.url}
              </a>
              {lecture.recording.password && (
                <div className="mt-2 text-sm">
                  <span className="brutal-tag bg-accent-pink">비밀번호</span>{" "}
                  <code className="font-mono font-bold">{lecture.recording.password}</code>
                </div>
              )}
              {lecture.recording.note && (
                <div className="mt-2 text-xs uppercase tracking-widest text-ink/60">
                  {lecture.recording.note}
                </div>
              )}
            </div>
          </section>
        )}

        {lecture.materials.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-2xl font-bold">📂 강의 자료</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {lecture.materials.map((m) => (
                <LinkCard key={m.url} link={m} />
              ))}
            </div>
          </section>
        )}

        {lecture.chat && (
          <section className="mt-8">
            <h2 className="font-display text-2xl font-bold">💬 강의 채팅</h2>
            <div className="mt-3">
              <LinkCard link={lecture.chat} />
            </div>
          </section>
        )}

        {lecture.linkGroups.map((group) => (
          <section key={group.title} className="mt-10">
            <div className="border-b-3 border-ink pb-2">
              <h2 className="font-display text-2xl font-bold">🔗 {group.title}</h2>
              {group.description && (
                <p className="mt-1 text-sm text-ink/70">{group.description}</p>
              )}
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {group.links.map((l) => (
                <LinkCard key={l.url + l.label} link={l} />
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
