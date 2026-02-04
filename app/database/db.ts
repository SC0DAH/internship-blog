import { MongoClient, Collection, Db } from "mongodb";
import type { User, BlogPost, Comment, Tag } from "../interfaces/blog";


if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not defined in .env");
if (!process.env.DB_NAME) throw new Error("DB_NAME not defined in .env");

const MONGO_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectdb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    cachedClient = client;
    cachedDb = client.db(DB_NAME);

    console.log("✅ Connected to MongoDB");

    process.on("SIGINT", async () => {
      if (cachedClient) {
        await cachedClient.close();
        console.log("Disconnected from MongoDB");
      }
      process.exit(0);
    });

    return cachedDb;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export async function getCollections() {
  const db = await connectdb();

  return {
    users: db.collection<User>("USERS_LOGIN"),
    blogPosts: db.collection<BlogPost>("BLOG_POSTS"),
    comments: db.collection<Comment>("COMMENTS"),
    tags: db.collection<Tag>("TAGS"),
  };
}
