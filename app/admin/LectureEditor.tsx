"use client";

import { useEffect, useState } from "react";
import type { Lecture, LinkGroup, LinkItem } from "@/lib/types";

export function LectureEditor({
  lecture,
  onSave,
}: {
  lecture: Lecture;
  onSave: (updated: Lecture) => void;
}) {
  const [draft, setDraft] = useState<Lecture>(lecture);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDraft(lecture);
    setDirty(false);
  }, [lecture]);

  const update = <K extends keyof Lecture>(key: K, value: Lecture[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const updateRecording = (field: "url" | "password" | "note", value: string) => {
    setDraft((prev) => ({
      ...prev,
      recording: {
        url: prev.recording?.url ?? "",
        password: prev.recording?.password,
        note: prev.recording?.note,
        [field]: value,
      },
    }));
    setDirty(true);
  };

  const updateChat = (field: "label" | "url", value: string) => {
    setDraft((prev) => ({
      ...prev,
      chat: {
        label: prev.chat?.label ?? "강의채팅",
        url: prev.chat?.url ?? "",
        [field]: value,
      },
    }));
    setDirty(true);
  };

  const addMaterial = () =>
    update("materials", [...draft.materials, { label: "", url: "", note: "" }]);
  const updateMaterial = (i: number, field: keyof LinkItem, v: string) => {
    const next = [...draft.materials];
    next[i] = { ...next[i], [field]: v };
    update("materials", next);
  };
  const removeMaterial = (i: number) =>
    update(
      "materials",
      draft.materials.filter((_, idx) => idx !== i),
    );

  const addGroup = () =>
    update("linkGroups", [
      ...draft.linkGroups,
      { title: "새 섹션", description: "", links: [] },
    ]);
  const updateGroup = (i: number, patch: Partial<LinkGroup>) => {
    const next = [...draft.linkGroups];
    next[i] = { ...next[i], ...patch };
    update("linkGroups", next);
  };
  const removeGroup = (i: number) =>
    update(
      "linkGroups",
      draft.linkGroups.filter((_, idx) => idx !== i),
    );
  const addGroupLink = (gi: number) => {
    const next = [...draft.linkGroups];
    next[gi].links = [...next[gi].links, { label: "", url: "", note: "" }];
    update("linkGroups", next);
  };
  const updateGroupLink = (
    gi: number,
    li: number,
    field: keyof LinkItem,
    v: string,
  ) => {
    const next = [...draft.linkGroups];
    const links = [...next[gi].links];
    links[li] = { ...links[li], [field]: v };
    next[gi].links = links;
    update("linkGroups", next);
  };
  const removeGroupLink = (gi: number, li: number) => {
    const next = [...draft.linkGroups];
    next[gi].links = next[gi].links.filter((_, idx) => idx !== li);
    update("linkGroups", next);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-3 border-ink pb-4">
        <h2 className="font-display text-2xl font-bold">강의 편집</h2>
        <button
          onClick={() => {
            onSave(draft);
            setDirty(false);
          }}
          disabled={!dirty}
          className={`brutal-btn ${
            dirty ? "bg-accent-yellow" : "bg-muted opacity-60"
          }`}
        >
          {dirty ? "✓ 변경사항 저장" : "저장됨"}
        </button>
      </div>

      <Section title="기본 정보">
        <Field label="슬러그 (URL)">
          <input
            value={draft.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="brutal-input"
            placeholder="claude-ai-intro"
          />
        </Field>
        <Field label="강의명">
          <input
            value={draft.title}
            onChange={(e) => update("title", e.target.value)}
            className="brutal-input"
          />
        </Field>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="대상">
            <input
              value={draft.audience}
              onChange={(e) => update("audience", e.target.value)}
              className="brutal-input"
            />
          </Field>
          <Field label="강사">
            <input
              value={draft.instructor}
              onChange={(e) => update("instructor", e.target.value)}
              className="brutal-input"
            />
          </Field>
          <Field label="일시 (YYYY-MM-DD)">
            <input
              type="date"
              value={draft.date}
              onChange={(e) => update("date", e.target.value)}
              className="brutal-input"
            />
          </Field>
        </div>
        <Field label="요약 (선택)">
          <textarea
            rows={3}
            value={draft.summary ?? ""}
            onChange={(e) => update("summary", e.target.value)}
            className="brutal-input resize-y"
          />
        </Field>
      </Section>

      <Section title="녹화본">
        <Field label="URL">
          <input
            value={draft.recording?.url ?? ""}
            onChange={(e) => updateRecording("url", e.target.value)}
            className="brutal-input"
            placeholder="https://vimeo.com/..."
          />
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="비밀번호">
            <input
              value={draft.recording?.password ?? ""}
              onChange={(e) => updateRecording("password", e.target.value)}
              className="brutal-input"
            />
          </Field>
          <Field label="노트 (예: Vimeo/Zoom)">
            <input
              value={draft.recording?.note ?? ""}
              onChange={(e) => updateRecording("note", e.target.value)}
              className="brutal-input"
            />
          </Field>
        </div>
      </Section>

      <Section title="강의 채팅">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="라벨">
            <input
              value={draft.chat?.label ?? ""}
              onChange={(e) => updateChat("label", e.target.value)}
              className="brutal-input"
            />
          </Field>
          <Field label="URL">
            <input
              value={draft.chat?.url ?? ""}
              onChange={(e) => updateChat("url", e.target.value)}
              className="brutal-input"
            />
          </Field>
        </div>
      </Section>

      <Section
        title="강의 자료"
        action={
          <button onClick={addMaterial} className="brutal-btn bg-accent-green text-sm">
            + 자료 추가
          </button>
        }
      >
        {draft.materials.length === 0 && (
          <p className="text-sm text-ink/50">아직 자료가 없습니다.</p>
        )}
        {draft.materials.map((m, i) => (
          <div
            key={i}
            className="mb-3 grid gap-2 border-3 border-ink bg-muted p-3 md:grid-cols-[1fr_1fr_160px_80px]"
          >
            <input
              value={m.label}
              onChange={(e) => updateMaterial(i, "label", e.target.value)}
              placeholder="라벨"
              className="brutal-input"
            />
            <input
              value={m.url}
              onChange={(e) => updateMaterial(i, "url", e.target.value)}
              placeholder="URL"
              className="brutal-input"
            />
            <input
              value={m.note ?? ""}
              onChange={(e) => updateMaterial(i, "note", e.target.value)}
              placeholder="노트"
              className="brutal-input"
            />
            <button
              onClick={() => removeMaterial(i)}
              className="brutal-btn bg-accent-pink text-sm"
            >
              삭제
            </button>
          </div>
        ))}
      </Section>

      <Section
        title="링크 그룹 (자유 섹션)"
        action={
          <button onClick={addGroup} className="brutal-btn bg-accent-green text-sm">
            + 섹션 추가
          </button>
        }
      >
        {draft.linkGroups.length === 0 && (
          <p className="text-sm text-ink/50">섹션을 추가해 강의에서 소개한 링크들을 정리하세요.</p>
        )}
        {draft.linkGroups.map((g, gi) => (
          <div key={gi} className="mb-5 border-3 border-ink bg-muted p-4">
            <div className="mb-3 grid gap-2 md:grid-cols-[1fr_1fr_auto]">
              <input
                value={g.title}
                onChange={(e) => updateGroup(gi, { title: e.target.value })}
                placeholder="섹션 제목"
                className="brutal-input font-bold"
              />
              <input
                value={g.description ?? ""}
                onChange={(e) => updateGroup(gi, { description: e.target.value })}
                placeholder="섹션 설명 (선택)"
                className="brutal-input"
              />
              <button
                onClick={() => removeGroup(gi)}
                className="brutal-btn bg-accent-pink text-sm"
              >
                섹션 삭제
              </button>
            </div>
            {g.links.map((l, li) => (
              <div
                key={li}
                className="mb-2 grid gap-2 border-3 border-ink bg-paper p-2 md:grid-cols-[1fr_1fr_120px_80px]"
              >
                <input
                  value={l.label}
                  onChange={(e) => updateGroupLink(gi, li, "label", e.target.value)}
                  placeholder="라벨"
                  className="brutal-input"
                />
                <input
                  value={l.url}
                  onChange={(e) => updateGroupLink(gi, li, "url", e.target.value)}
                  placeholder="URL"
                  className="brutal-input"
                />
                <input
                  value={l.note ?? ""}
                  onChange={(e) => updateGroupLink(gi, li, "note", e.target.value)}
                  placeholder="노트"
                  className="brutal-input"
                />
                <button
                  onClick={() => removeGroupLink(gi, li)}
                  className="brutal-btn bg-accent-pink text-xs"
                >
                  삭제
                </button>
              </div>
            ))}
            <button
              onClick={() => addGroupLink(gi)}
              className="brutal-btn mt-2 bg-accent-blue text-sm"
            >
              + 링크 추가
            </button>
          </div>
        ))}
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <div className="mb-3 flex items-center justify-between border-b-3 border-ink pb-2">
        <h3 className="font-display text-lg font-bold uppercase tracking-wide">
          {title}
        </h3>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-ink/60">
        {label}
      </span>
      {children}
    </label>
  );
}
