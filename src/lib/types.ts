// src/lib/types.ts
export interface Poema {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  theme: string;
  subtitle?: string;
  published_date: string;
  created_at: string;
}

export interface Like {
  id: string;
  poema_id: string;
  liked_at: string;
}

export interface Comment {
  id: string;
  poema_id: string;
  content: string;
  created_at: string;
}