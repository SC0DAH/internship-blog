import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import type { BlogComment } from "~/interfaces/types";
import { useNuxtApp } from "#app";

export function useComments() {
  const getDb = () => {
    if (!process.client) throw new Error("Firestore kan alleen client-side gebruikt worden")
    const { $db } = useNuxtApp();
    if (!$db) throw new Error("Firestore niet geïnitialiseerd");
    return $db;
  };

  const getCommentsRealtime = (postId: string, callback: (comments: BlogComment[]) => void) => {
    const db = getDb();
    const commentsCol = collection(db, "comments");
    const q = query(commentsCol, orderBy("createdAt", "asc"));
    return onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs
        .map(doc => ({ id: doc.id, ...(doc.data() as any) }))
        .filter(c => c.postId === postId);
      callback(comments);
    });
  };

  const addComment = async (comment: Omit<BlogComment, "id" | "createdAt">) => {
    const db = getDb();
    await addDoc(collection(db, "comments"), {
      ...comment,
      createdAt: Timestamp.fromDate(new Date())
    });
  };

  return { getCommentsRealtime, addComment };
}