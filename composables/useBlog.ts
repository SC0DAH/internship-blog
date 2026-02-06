import { collection, doc, addDoc, updateDoc, onSnapshot, query, orderBy, increment, getDoc, type Unsubscribe } from "firebase/firestore";
import type { BlogPost } from "~/interfaces/types";

export function useBlog() {
  const getDb = () => {
    const { $db } = useNuxtApp();
    if (!$db) {
      throw new Error("Firebase Firestore is niet geïnitialiseerd. Zorg dat de Firebase plugin geladen is.");
    }
    return $db;
  };

  const getAllBlogsRealtime = (callback: (blogs: BlogPost[]) => void): Unsubscribe => {
    const db = getDb();
    const blogsCol = collection(db, "blogs");
    const q = query(blogsCol, orderBy("createdAt", "desc"));
    
    return onSnapshot(q, (snapshot) => {
      const blogs: BlogPost[] = snapshot.docs.map(docSnap => {
        const data = docSnap.data() as any;
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        };
      });
      callback(blogs);
    }, (error) => {
      console.error("Error fetching blogs:", error);
    });
  };

  const getBlog = async (id: string): Promise<BlogPost | null> => {
    try {
      const db = getDb();
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as any;
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as BlogPost;
      }
      return null;
    } catch (error) {
      console.error("Error getting blog:", error);
      return null;
    }
  };

  const createBlog = async (blog: Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "views">) => {
    try {
      const db = getDb();
      const blogsCol = collection(db, "blogs");
      
      await addDoc(blogsCol, {
        ...blog,
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  };

  const updateBlog = async (id: string, blog: Partial<BlogPost>) => {
    try {
      const db = getDb();
      const docRef = doc(db, "blogs", id);
      
      await updateDoc(docRef, {
        ...blog,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  };

  const incrementViews = async (id: string) => {
    try {
      const db = getDb();
      const docRef = doc(db, "blogs", id);
      await updateDoc(docRef, { views: increment(1) });
    } catch (error) {
      console.error("Error incrementing views:", error);
      throw error;
    }
  };

  return { getAllBlogsRealtime, getBlog, createBlog, updateBlog, incrementViews };
}