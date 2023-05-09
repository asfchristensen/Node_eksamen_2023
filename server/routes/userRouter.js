import { Router } from "express";
const router = Router();

import db from "../database/createDatabase.js";
import bcrypt from "bcrypt";


router.get("/api/users", async (req, res) => {
    const allUsers = await db.collection("users").find().toArray();
    res.status(200).send({ data: allUsers });
});


router.post("/api/users", async (req, res) => {
    const { username, email, password } = req.body;
    console.log("recieved ", req.body);

    const userExists = await db.collection("users").find({ email: email }).toArray();
    
    if(userExists.length === 0) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const userRole = 2;

        const newUser = { username: username, email: email, password: hashedPassword, role_id: userRole };
        db.collection("users").insertOne(newUser);

        res.status(200).send({ data: newUser });
    } else {
        res.status(409).send({ message: "error" });
    }
});


export default router;
