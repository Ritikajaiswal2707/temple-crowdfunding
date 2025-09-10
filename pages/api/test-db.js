import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("templecrowdfunding"); // same as in your connection string

    // check collections
    const collections = await db.listCollections().toArray();

    res.status(200).json({
      message: "✅ Connected to MongoDB successfully!",
      collections: collections.map(col => col.name),
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({ message: "❌ Failed to connect to MongoDB", error });
  }
}
