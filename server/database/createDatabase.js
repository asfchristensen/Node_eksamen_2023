import db  from "./connection.js";
import bcrypt from "bcrypt";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if (isDeleteMode) {
    console.log('farvel');
    db.users.drop(); 
} 

const adminPlainPassword = "admin123";
const adminHashedPassword = await bcrypt.hash(adminPlainPassword, 12);

const userPlainPassword = "user123";
const userHashedPassword = await bcrypt.hash(userPlainPassword, 12);

db.users.insertMany([
    { username: "admin", email: "admin@mail.dk", password: adminHashedPassword, role_id: 1 }, 
    { username: "user", email: "user@mail.dk", password: userHashedPassword, role_id: 2 }
]);
