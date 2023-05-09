import db from "./connection.js"
import bcrypt from "bcrypt";


const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if (isDeleteMode) {
    const collections = await db.listCollections().toArray();
    collections.forEach(collectionToDelete => {
        db.dropCollection(collectionToDelete.name);
        db.createCollection("users");
    });
}

if (isDeleteMode) {
    const adminPlainPassword = "admin123";
    const adminHashedPassword = await bcrypt.hash(adminPlainPassword, 12);

    const userPlainPassword = "user123";
    const userHashedPassword = await bcrypt.hash(userPlainPassword, 12);

    db.collection("users").insertMany([
        { username: "admin", email: "admin@mail.dk", password: adminHashedPassword, role_id: 10 }, 
        { username: "user", email: "user@mail.dk", password: userHashedPassword, role_id: 24 }
    ]);

    const all = await db.collection("users").find().toArray();
    console.log(all);
}

export default db;

