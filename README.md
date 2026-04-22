# Lecture Summary

> KAEA & AICLab — 김진수 강사의 **강의 아카이브 웹앱**
> 깔끔한 네오브루탈리즘 디자인 · JSON 기반 · 관리자 편집 가능

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-deployed-000)](https://vercel.com)

---

## ✨ 핵심 기능

| 화면 | 설명 |
|---|---|
| `/` | 강의 아카이브 카드 목록 (최신순 자동 정렬) |
| `/lectures/[slug]` | 강의 상세 페이지 (녹화·자료·링크 그룹) |
| `/lectures/[slug]?solo=1` | **수강생 공유 모드** — 네비·목록 링크 숨김 |
| `/admin` | 비밀번호 보호 관리자 페이지 — 강의 CRUD + 복제 + JSON 내보내기 |

### 관리자 기능
- ➕ 강의 추가 · ✏️ 수정 · 🗑️ 삭제
- 📋 **복제(Duplicate)** — 기존 강의를 템플릿처럼 복사해 내용만 갈아끼움 (패턴 반복의 핵심)
- 💾 **JSON 내보내기** — `lectures.json` 다운로드
- 📂 **JSON 불러오기** — 백업 복원

### 디자인
- 네오브루탈리즘 스타일 (검정 3px 테두리, 오프셋 하드섀도, 비대칭 레이아웃)
- 포인트 컬러: 노랑 `#FFDD33` / 분홍 `#FF6B9D` / 파랑 `#5B8FFF` / 초록 `#8FE066`
- 타이포: Space Grotesk (헤딩) + Pretendard (본문)

---

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 관리자 비밀번호 설정
cp .env.example .env.local
# .env.local 파일에서 NEXT_PUBLIC_ADMIN_PASSWORD 를 원하는 값으로 변경

# 개발 서버
npm run dev
# → http://localhost:3000
```

---

## 📝 새 강의 추가 운영 흐름

```
1. https://<your-site>/admin 접속 → 비밀번호 입력
2. "+ 새 강의" 또는 기존 강의 [복제] 클릭
3. 폼에서 내용 입력 → "✓ 변경사항 저장"
4. 상단 "💾 JSON 내보내기" 클릭 → lectures.json 다운로드
5. GitHub 웹에서 data/lectures.json 에 드래그 업로드 (기존 파일 덮어쓰기)
6. Vercel이 자동 재배포 (약 30초)
7. /lectures/<slug>?solo=1 URL을 수강생에게 공유
```

> 💡 관리자 페이지는 localStorage에 "작업 중인 드래프트"를 저장합니다.
> 실제 배포 데이터는 GitHub의 `data/lectures.json` 파일이 기준입니다.

---

## 🗂 프로젝트 구조

```
.
├─ app/
│  ├─ page.tsx                 # 홈 (아카이브 목록)
│  ├─ layout.tsx               # 루트 레이아웃
│  ├─ globals.css              # 네오브루탈 스타일
│  ├─ lectures/[slug]/
│  │  ├─ page.tsx              # 강의 상세
│  │  └─ not-found.tsx
│  └─ admin/
│     ├─ page.tsx              # 로그인 게이트
│     ├─ AdminDashboard.tsx    # 관리자 대시보드
│     └─ LectureEditor.tsx     # 강의 편집 폼
├─ components/
│  ├─ Header.tsx · Footer.tsx
│  ├─ LectureCard.tsx
│  └─ LinkCard.tsx
├─ data/
│  └─ lectures.json            # 🎯 배포 데이터 (Git에 커밋)
├─ lib/
│  ├─ types.ts                 # Lecture 타입 정의
│  └─ data.ts                  # 데이터 로더
├─ docs/plans/
│  └─ 2026-04-22-lecture-archive-design.md  # 설계 문서
├─ tailwind.config.ts
└─ next.config.mjs
```

---

## 🧩 Lecture 스키마

```typescript
type Lecture = {
  slug: string;           // URL 식별자 (영문·대시)
  title: string;
  audience: string;
  instructor: string;
  date: string;           // "YYYY-MM-DD"
  summary?: string;
  recording?: { url: string; password?: string; note?: string };
  materials: Array<{ label: string; url: string; note?: string }>;
  chat?: { label: string; url: string };
  linkGroups: Array<{
    title: string;
    description?: string;
    links: Array<{ label: string; url: string; note?: string }>;
  }>;
};
```

`linkGroups`가 배열이므로 강의마다 **자유로운 섹션 개수·제목**을 쓸 수 있습니다.

---

## 🔐 보안 주의

- 관리자 비밀번호는 `NEXT_PUBLIC_*` 변수라 **클라이언트 번들에 포함**됩니다.
- 이 앱의 관리자 게이트는 "실수 방지 수준의 접근 제어"입니다.
- 민감한 자료 게시 시에는 관리자 URL을 공개하지 마시고, 더 강한 인증이 필요하면 Supabase Auth 등으로 확장하세요.

---

## 📦 배포

Vercel 자동 배포:
1. GitHub 레포 연결
2. 환경변수: `NEXT_PUBLIC_ADMIN_PASSWORD`
3. `main` 브랜치 푸시 시 자동 빌드·배포

---

## 📄 설계 문서

[docs/plans/2026-04-22-lecture-archive-design.md](docs/plans/2026-04-22-lecture-archive-design.md)

---

## 📮 문의

**KAEA & AICLab**
- 대표자: **김진수**
- 📞 010-8921-9536
- ✉️ info@aiclab2020.com
- 🌐 https://kimjinsoo-info.lovable.app
- 📍 서울특별시 서초구 서초중앙로2길 35 (서초동)

---

## 📜 라이선스

© 2026 KAEA & AICLab. All rights reserved.

🤖 Built with [Claude Code](https://claude.com/claude-code)
