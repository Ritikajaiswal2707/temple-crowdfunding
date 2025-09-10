import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("❌ Please add your Mongo URI to .env.local");
}

let client = new MongoClient(uri, options);
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In dev mode, reuse client across hot reloads
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create new client every time
  clientPromise = client.connect();
}

export default clientPromise;
