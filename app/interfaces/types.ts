import type { Timestamp } from "firebase/firestore"

export interface Author {
  id: string
  name: string
  avatar?: string
}

export interface BlogComment {
  id?: string
  postId: string
  commenterUid: string
  commenterDisplayName: string
  content: string
  createdAt: Timestamp
}

export interface Tag {
  name: string
}

export interface BlogPost {
  id?: string
  title: string
  content: string
  author: Author
  tags?: Tag[]
  createdAt: Date
  updatedAt: Date
  views: number
}

export interface User {
  uid: string
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