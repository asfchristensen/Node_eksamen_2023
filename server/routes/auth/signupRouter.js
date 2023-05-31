import { Router } from "express";
const router = Router();

import db from "../../database/connectionAtlas.js";
import bcrypt from "bcrypt";
import { sendConfirmationMail } from "../../util/nodemailer.js";

router.post("/api/all/auth/signup", async (req, res) => {
    const { ...user } = req.body;
    const userToSave = { ...user };

    const userExist = await db.collection("users").findOne({ email: userToSave.email });
    
    if (userExist || userToSave.password !== userToSave.confirmPassword) {
        return res.status(400).send({ message: "error - user already exists or password mismatch", status: 400 });
    } else {
        const hashedPassword = await bcrypt.hash(userToSave.password, 12);
        const userRole = 2;

        const newUser = { 
            username: userToSave.username,
            email: userToSave.email,
            password: hashedPassword,
            role_id: userRole,
            profilePicture: "../profilePictures/default.png",
            memberSince: userToSave.memberSince
        };

        await db.collection("users").insertOne(newUser);
        sendConfirmationMail(userToSave.username, userToSave.email).catch(console.error);
        return res.status(200).send({ data: userToSave.username, status: 200 });
    }
});

export default router;