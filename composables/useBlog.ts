import { collection, doc, addDoc, updateDoc, onSnapshot, query, orderBy, increment, getDoc, getDocs, deleteDoc, limit, type Unsubscribe } from "firebase/firestore";
import type { BlogPost } from "~/interfaces/types";
import { useAuth } from "./useAuth";

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

  const deleteBlog = async (id: string) => {
    try {
      const db = getDb();
      const docRef = doc(db, "blogs", id);

      await deleteDoc(docRef);
      
    } catch (error: any) {
      console.error("Error deleting blog:", error);
      
      if (error?.code === 'permission-denied') {
        throw new Error('Je hebt geen toestemming om deze blog te verwijderen. Alleen admins kunnen blogs verwijderen.');
      }
      
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

  const getLatestBlog = async (): Promise<BlogPost | null> => {
    try {
        const db = getDb();
        const blogsCol = collection(db, "blogs");

        const q = query(blogsCol, orderBy("createdAt", "desc"), limit(1));
        const snapshot = await getDocs(q);


        const docSnap = snapshot.docs[0];
        if (!docSnap) {
        return null;
        }
        const data = docSnap.data() as any;

        return {
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
        } as BlogPost;

    } catch (error) {
        console.error("Error getting latest blog:", error);
        return null;
    }
    };

  return { getAllBlogsRealtime, getBlog, createBlog, updateBlog, incrementViews, deleteBlog, getLatestBlog };
}