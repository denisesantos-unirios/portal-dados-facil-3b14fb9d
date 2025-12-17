export interface ForumCategory {
  id: string;
  name: string;
  count: number;
}

export interface Discussion {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  author: string;
  responses: number;
  likes: number;
  createdAt: string;
}

export interface ForumStats {
  discussions: number;
  members: number;
  responses: number;
}
