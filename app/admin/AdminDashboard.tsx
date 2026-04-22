"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lecture, LectureArchive } from "@/lib/types";
import { LectureEditor } from "./LectureEditor";

const EMPTY_LECTURE: Lecture = {
  slug: "new-lecture",
  title: "새 강의 제목",
  audience: "대상 설명",
  instructor: "김진수",
  date: new Date().toISOString().slice(0, 10),
  summary: "",
  materials: [],
  linkGroups: [],
};

export function AdminDashboard({
  archive,
  onChange,
  onLogout,
}: {
  archive: LectureArchive;
  onChange: (next: LectureArchive) => void;
  onLogout: () => void;
}) {
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const editing = archive.lectures.find((l) => l.slug === editingSlug);

  const updateArchive = (lectures: Lecture[]) => {
    onChange({ updatedAt: new Date().toISOString().slice(0, 10), lectures });
  };

  const handleAdd = () => {
    const stamp = Date.now().toString(36);
    const newOne: Lecture = { ...EMPTY_LECTURE, slug: `new-lecture-${stamp}` };
    updateArchive([newOne, ...archive.lectures]);
    setEditingSlug(newOne.slug);
  };

  const handleDuplicate = (slug: string) => {
    const src = archive.lectures.find((l) => l.slug === slug);
    if (!src) return;
    const stamp = Date.now().toString(36);
    const copy: Lecture = {
      ...JSON.parse(JSON.stringify(src)),
      slug: `${src.slug}-copy-${stamp}`,
      title: `${src.title} (복사본)`,
    };
    updateArchive([copy, ...archive.lectures]);
    setEditingSlug(copy.slug);
  };

  const handleDelete = (slug: string) => {
    if (!confirm(`"${slug}" 강의를 삭제하시겠습니까?`)) return;
    updateArchive(archive.lectures.filter((l) => l.slug !== slug));
    if (editingSlug === slug) setEditingSlug(null);
  };

  const handleSave = (updated: Lecture, originalSlug: string) => {
    const next = archive.lectures.map((l) =>
      l.slug === originalSlug ? updated : l,
    );
    updateArchive(next);
    setEditingSlug(updated.slug);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(archive, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lectures.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const parsed = JSON.parse(text) as LectureArchive;
      if (!Array.isArray(parsed.lectures)) throw new Error("Invalid format");
      onChange(parsed);
      alert("불러오기 완료!");
    } catch (err) {
      alert("JSON 파일 형식이 올바르지 않습니다.");
    }
    e.target.value = "";
  };

  const handleResetToSeed = () => {
    if (
      !confirm("현재 편집 내용을 모두 버리고 배포된 lectures.json으로 되돌릴까요?")
    )
      return;
    localStorage.removeItem("lecture-archive-draft");
    location.reload();
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      <header className="border-b-3 border-ink bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-xl font-bold uppercase tracking-widest">
              🛠 Admin
            </h1>
            <Link href="/" className="text-sm underline">
              ← 사이트로
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <button onClick={handleExport} className="brutal-btn bg-accent-yellow text-ink">
              💾 JSON 내보내기
            </button>
            <label className="brutal-btn cursor-pointer bg-accent-blue text-ink">
              📂 JSON 불러오기
              <input
                type="file"
                accept="application/json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={handleResetToSeed}
              className="brutal-btn bg-paper text-ink"
              title="배포된 lectures.json으로 되돌리기"
            >
              ↺ 초기화
            </button>
            <button onClick={onLogout} className="brutal-btn bg-accent-pink text-ink">
              🔒 로그아웃
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[340px_1fr]">
        <aside className="border-3 border-ink bg-paper p-5 shadow-brutal">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">강의 목록 ({archive.lectures.length})</h2>
            <button onClick={handleAdd} className="brutal-btn bg-accent-green text-sm">
              + 새 강의
            </button>
          </div>
          <ul className="space-y-3">
            {archive.lectures.map((lec) => (
              <li
                key={lec.slug}
                className={`border-3 border-ink p-3 ${
                  editingSlug === lec.slug ? "bg-accent-yellow" : "bg-muted"
                }`}
              >
                <button
                  onClick={() => setEditingSlug(lec.slug)}
                  className="block w-full text-left"
                >
                  <div className="font-display text-sm font-bold leading-tight">
                    {lec.title}
                  </div>
                  <div className="mt-1 text-xs text-ink/60">
                    {lec.date} · <code>/{lec.slug}</code>
                  </div>
                </button>
                <div className="mt-2 flex gap-1 text-xs">
                  <button
                    onClick={() => handleDuplicate(lec.slug)}
                    className="border-3 border-ink bg-paper px-2 py-1 font-bold hover:bg-accent-blue"
                  >
                    복제
                  </button>
                  <Link
                    href={`/lectures/${lec.slug}`}
                    target="_blank"
                    className="border-3 border-ink bg-paper px-2 py-1 font-bold hover:bg-accent-green"
                  >
                    미리보기
                  </Link>
                  <button
                    onClick={() => handleDelete(lec.slug)}
                    className="border-3 border-ink bg-paper px-2 py-1 font-bold hover:bg-accent-pink"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <section className="border-3 border-ink bg-paper shadow-brutal">
          {editing ? (
            <LectureEditor
              key={editing.slug}
              lecture={editing}
              onSave={(updated) => handleSave(updated, editing.slug)}
            />
          ) : (
            <div className="p-10 text-center text-ink/60">
              <p className="font-display text-lg">
                왼쪽에서 강의를 선택하거나 "+ 새 강의"를 눌러 시작하세요.
              </p>
              <div className="mt-6 rounded-none border-3 border-ink bg-accent-yellow p-5 text-left text-sm text-ink">
                <div className="font-display font-bold">📌 운영 흐름</div>
                <ol className="mt-2 list-decimal space-y-1 pl-5">
                  <li>여기서 강의를 편집·추가·복제합니다</li>
                  <li>상단 "💾 JSON 내보내기"로 <code>lectures.json</code> 다운로드</li>
                  <li>GitHub 웹에서 <code>data/lectures.json</code>에 드래그 업로드</li>
                  <li>Vercel이 자동 재배포 (약 30초)</li>
                </ol>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
