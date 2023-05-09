import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

const URL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(URL);

await client.connect();
console.log('Connected to MongoDB');

const db = client.db(process.env.LOCAL_DB_NAME);

export default db;