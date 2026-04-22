import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function LectureNotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="border-3 border-ink bg-accent-pink p-10 shadow-brutal-lg">
          <h1 className="font-display text-4xl font-bold">강의를 찾을 수 없습니다</h1>
          <p className="mt-4 text-ink/70">요청하신 강의가 존재하지 않거나 이동되었습니다.</p>
          <Link href="/" className="brutal-btn mt-6 bg-paper">
            ← 전체 강의 목록으로
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
