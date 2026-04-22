import archive from "@/data/lectures.json";
import type { Lecture, LectureArchive } from "./types";

const typedArchive = archive as LectureArchive;

export function getAllLectures(): Lecture[] {
  return [...typedArchive.lectures].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

export function getLectureBySlug(slug: string): Lecture | undefined {
  return typedArchive.lectures.find((lec) => lec.slug === slug);
}

export function getArchiveUpdatedAt(): string {
  return typedArchive.updatedAt;
}
