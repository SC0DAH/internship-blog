export interface Author {
  id: string
  name: string
  avatar?: string
}

export interface Comment {
  id: string
  postId: string
  authorName: string
  content: string
  createdAt: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  author: Author
  tags?: Tag[]
  publishedAt?: string
  updatedAt?: string
  views?: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role?: 'admin' | 'reader'
  createdAt?: string
  updatedAt?: string
}

export interface Tag {
  id: string
  name: string,
}

