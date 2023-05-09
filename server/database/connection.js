import { MongoClient } from "mongodb";

const URL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(URL);

await client.connect();
console.log('Connected to MongoDB');

const dbToDelete = client.db("food_universe");
dbToDelete.dropDatabase();
const db = client.db("food_universe");      


export default {
    db,
    users: db.collection("users")
}
