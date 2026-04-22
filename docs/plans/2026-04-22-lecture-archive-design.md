# 강의 아카이브 웹앱 설계안

- **작성일**: 2026-04-22
- **작성자**: 김진수 (AICLab) + Claude Code
- **프로젝트명**: Lecture Summary (강의 아카이브)
- **목적**: AICLab 강의 콘텐츠(녹화·자료·링크)를 깔끔히 정리해 수강생에게 배포하고, 강사가 관리자 페이지에서 패턴(템플릿 구조)을 반복 사용해 새 강의를 빠르게 등록할 수 있는 웹앱

---

## 1. 기술 스택

| 항목 | 선택 |
|---|---|
| 프레임워크 | Next.js 14 (App Router) + TypeScript |
| 스타일 | Tailwind CSS + 네오브루탈리즘 디자인 토큰 |
| 데이터 저장 | `data/lectures.json` (Git 커밋 정적 파일) |
| 인증(관리자) | 환경변수 비밀번호 + 클라이언트 게이트 |
| 배포 | Vercel (GitHub 연동 자동 배포) |
| 버전관리 | GitHub 신규 레포 |

**선택 근거**: 소규모 개인 프로젝트, DB 불필요, 수정은 주 1~2회 수준. JSON 파일 방식이 무료이며 Git 히스토리로 백업/롤백이 공짜.

---

## 2. 페이지 구조 (라우팅)

| URL | 역할 | 접근 |
|---|---|---|
| `/` | 강의 아카이브 카드 목록 (최신순) | 공개 |
| `/lectures/[slug]` | 강의 상세 페이지 | 공개 |
| `/lectures/[slug]?solo=1` | 수강생 공유 모드 (네비 숨김) | 공개 |
| `/admin` | 관리자 대시보드 | 비밀번호 게이트 |

---

## 3. 데이터 모델

```typescript
type Lecture = {
  slug: string;              // URL용 식별자 (영문·대시)
  title: string;             // 강의명
  audience: string;          // 대상
  instructor: string;        // 강사
  date: string;              // ISO 날짜 "2026-04-20"
  recording?: {
    url: string;
    password?: string;
  };
  materials: Array<{ label: string; url: string; note?: string }>;
  chat?: { label: string; url: string };
  linkGroups: Array<{
    title: string;
    links: Array<{ label: string; url: string; note?: string }>;
  }>;
};
```

`linkGroups`를 배열로 설계해 강의마다 섹션 개수·제목을 자유롭게 구성 가능.

---

## 4. 관리자 기능 (`/admin`)

1. **비밀번호 게이트** — 환경변수 `NEXT_PUBLIC_ADMIN_PASSWORD` 와 비교
2. **강의 목록** — 제목·날짜·슬러그 테이블 + [수정][복제][삭제]
3. **편집 폼** — 메타·녹화·자료·링크그룹 동적 추가/제거
4. **복제 기능** — 기존 강의를 템플릿처럼 복사 (패턴 반복 핵심)
5. **JSON 내보내기** — `lectures.json` 다운로드
6. **JSON 불러오기** — 백업 파일 복원

운영 흐름:
```
/admin → 비밀번호 → 편집/복제 → 내보내기
→ GitHub 웹 UI에서 lectures.json 드래그 업로드 → Vercel 자동 재배포
```

---

## 5. 네오브루탈리즘 디자인 시스템

**컬러 토큰**
- `--bg`: `#FFFFFF`
- `--fg`: `#000000`
- `--accent-yellow`: `#FFDD33`
- `--accent-pink`: `#FF6B9D`
- `--accent-blue`: `#5B8FFF`
- `--muted`: `#F5F5F5`

**스타일 규칙**
- 모든 카드·버튼: `border: 3px solid #000`
- 오프셋 하드섀도: `box-shadow: 4px 4px 0 0 #000` (blur 0)
- 라운딩 0~4px
- 타이포: 헤딩 `Space Grotesk 800`, 본문 `Pretendard 500`
- 호버: 그림자 제거 + `translate(2px, 2px)` (눌리는 느낌)
- 비대칭 레이아웃 · 굵은 구분선 · 넉넉한 여백

---

## 6. 푸터 (고정)

```
KAEA & AICLab
대표자: 김진수
010-8921-9536
info@aiclab2020.com
https://kimjinsoo-info.lovable.app
서울특별시 서초구 서초중앙로2길 35 (서초동)
```

---

## 7. 초기 시드 데이터

2026-04-20 진행된 "클로드AI 소개 및 스킬기능 실습특강"을 첫 번째 강의로 `data/lectures.json`에 시드.

- 녹화: Vimeo (비번 123)
- 실습자료: Canva
- 강의채팅: Google Docs
- 링크 그룹 4개: Claude 제품/Skills 라이브러리/클로드 아카데미/Skills 생태계

---

## 8. 배포 파이프라인

1. 로컬 Next.js 프로젝트 생성 및 구현
2. Git 초기화 + 첫 커밋
3. GitHub에 동일 이름(`lecture-summary`)으로 원격 레포 생성
4. Push to `main`
5. Vercel 프로젝트 연결 및 최초 배포
6. 환경변수 `NEXT_PUBLIC_ADMIN_PASSWORD` 설정

---

## 9. 범위 외 (YAGNI)

- 다중 관리자 계정
- 수강생 로그인/진도 추적
- 댓글·좋아요
- 다국어 지원
- DB(Supabase 등)

필요해지면 별도 설계로 확장.
