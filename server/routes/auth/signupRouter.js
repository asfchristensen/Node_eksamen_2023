import { Router } from "express";
const router = Router();

import db from "../../database/connectionAtlas.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { sendConfirmationMail } from "../../util/nodemailer.js";

router.post("/api/auth/signup", async (req, res) => {
    const { username, password, confirmedPassword, email, memberSince } = req.body;
    const sanitizedUsername = validator.escape(username);
    const sanitizedPassword = validator.escape(password);
    const sanitizedConfirmPassword = validator.escape(confirmedPassword);
    const sanitizedEmail = validator.escape(email);
    
    const userExist = await db.collection("users").find({ email: sanitizedEmail }).toArray();

    if (userExist.length === 0 && sanitizedPassword === sanitizedConfirmPassword) {
        const hashedPassword = await bcrypt.hash(sanitizedPassword, 12);
        const userRole = 2;

        const newUser = { 
            username: sanitizedUsername, 
            email: sanitizedEmail, 
            password: hashedPassword, 
            role_id: userRole, 
            profilePicture: "../profilePictures/default.png", 
            memberSince: memberSince  
        };

        db.collection("users").insertOne(newUser);

        sendConfirmationMail(username, email).catch(console.error);

        return res.status(200).send({ data: sanitizedUsername });
    } else {
        return res.status(400).send({ message: "error" });
    }
});

export default router;