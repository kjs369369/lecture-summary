export type LinkItem = {
  label: string;
  url: string;
  note?: string;
};

export type LinkGroup = {
  title: string;
  description?: string;
  links: LinkItem[];
};

export type Recording = {
  url: string;
  password?: string;
  note?: string;
};

export type Material = {
  label: string;
  url: string;
  note?: string;
};

export type Chat = {
  label: string;
  url: string;
};

export type Lecture = {
  slug: string;
  title: string;
  audience: string;
  instructor: string;
  date: string;
  summary?: string;
  recording?: Recording;
  materials: Material[];
  chat?: Chat;
  linkGroups: LinkGroup[];
};

export type LectureArchive = {
  updatedAt: string;
  lectures: Lecture[];
};
