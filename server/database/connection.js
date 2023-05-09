import { MongoClient } from "mongodb";

const URL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(URL);
await client.connect();

const db = client.db("food_universe");

export default {
    users: db.collection("users")
}

