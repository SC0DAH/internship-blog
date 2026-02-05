import type { Timestamp } from "firebase/firestore"

export interface Author {
  uid: string
  name: string
  avatar?: string
}

export interface Comment {
  id?: string
  postId: string
  authorUid: string
  authorName: string
  content: string
  createdAt: Timestamp
}

export interface Tag {
  id?: string
  name: string
}

export interface BlogPost {
  id?: string
  title: string
  content: string
  author: Author
  tags?: Tag[]
  publishedAt?: Timestamp
  updatedAt?: Timestamp
  views?: number
}

export interface User {
  uid: string         // Firebase Auth UID
  name: string
  email: string
  role: 'user' | 'admin'
  createdAt: Timestamp
  updatedAt?: Timestamp
}

export interface RegisterResponse {
  message: string
  userId: string
}