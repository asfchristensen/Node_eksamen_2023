import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";
import bcrypt from "bcrypt";
import sendSMS from "../util/sendSMS.js";


router.post("/api/auth/forgot-password", async (req, res) => {
    const { email, phoneNumber } = req.body;

    const userExists = await db.collection("users").findOne({ email: email });
    console.log("Found user: ", userExists);

    if (!userExists) {
        res.status(400).send({ message: "error - email not found" });
    } else {
        const activationCode = Math.floor(Math.random() * 1_000_000);
        console.log(activationCode);
    
        // indsæt aktiveringskode og email i ny collection "activation_codes" 
        const emailExists = await db.collection("activation_codes").findOne({ email: email });
        console.log(emailExists);
        if (emailExists) {
            // sletter hele dokumentet med den specifikke email
            console.log("Deleted the existing document with that email: ", emailExists);
            await db.collection("activation_codes").deleteOne({ email: email });

        } 

        console.log("Created new document with the email and activation code");
        await db.collection("activation_codes").insertOne({ email: email, code: activationCode });   
    

        try {
            sendSMS(activationCode, phoneNumber);
            return res.status(200).send({ message: "SMS sent" });  //
        } catch (error) {
            console.error("Error sending SMS: ", error);
            return res.status(400).send({ message: "error sending SMS"});
        }
    } 
});

router.post("/api/auth/update-password", async (req, res) => {
    const { activationCode, newPassword, confirmPassword } = req.body;

    console.log("body update:", req.body);
    console.log()

    const activationCodeExists = await db.collection("activation_codes").findOne({ code: activationCode });
    console.log("activation code found: ",activationCodeExists);
    
    if (!activationCodeExists || newPassword !== confirmPassword) {
        res.status(400).send({ message: "error - activation code not found or password mismatch" });
    } else {
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        console.log(hashedNewPassword); 

        await db.collection("activation_codes").deleteOne({ code: activationCode });
        await db.collection("users").updateOne({ email: activationCodeExists.email }, { $set: { password: hashedNewPassword }});
        res.send({ message: "success - new password created" });
    }
});

export default router;