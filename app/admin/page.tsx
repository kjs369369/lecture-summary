"use client";

import { useEffect, useState } from "react";
import { AdminDashboard } from "./AdminDashboard";
import seedArchive from "@/data/lectures.json";
import type { LectureArchive } from "@/lib/types";

const STORAGE_KEY = "lecture-archive-draft";
const AUTH_KEY = "lecture-admin-auth";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [archive, setArchive] = useState<LectureArchive | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(AUTH_KEY);
    if (saved === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed) return;
    const draft = localStorage.getItem(STORAGE_KEY);
    if (draft) {
      try {
        setArchive(JSON.parse(draft));
        return;
      } catch {}
    }
    setArchive(seedArchive as LectureArchive);
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin";
    if (password === expected) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md border-3 border-ink bg-paper p-8 shadow-brutal-lg"
        >
          <div className="brutal-tag bg-accent-yellow">ADMIN</div>
          <h1 className="mt-4 font-display text-3xl font-bold">관리자 로그인</h1>
          <p className="mt-2 text-sm text-ink/60">
            강의 아카이브를 수정하려면 비밀번호를 입력하세요.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="brutal-input mt-6"
            autoFocus
          />
          {error && <p className="mt-2 text-sm font-bold text-red-600">{error}</p>}
          <button type="submit" className="brutal-btn mt-4 w-full bg-accent-yellow">
            로그인
          </button>
          <p className="mt-4 text-xs text-ink/50">
            비밀번호는 환경변수 <code>NEXT_PUBLIC_ADMIN_PASSWORD</code>로 설정됩니다.
          </p>
        </form>
      </main>
    );
  }

  if (!archive) return null;

  return (
    <AdminDashboard
      archive={archive}
      onChange={(next) => {
        setArchive(next);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }}
      onLogout={handleLogout}
    />
  );
}
