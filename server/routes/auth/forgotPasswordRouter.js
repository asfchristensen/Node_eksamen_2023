import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
const router = Router();

import db from "../../database/connectionAtlas.js";
import bcrypt from "bcrypt";
import sendSMS from "../../util/sendSMS.js";


router.post("/api/auth/forgot-password", async (req, res) => {
    const { email, phoneNumber } = req.body;

    const userExists = await db.collection("users").findOne({ email: email });
    console.log("Found user: ", userExists);

    if (!userExists) {
        return res.status(400).send({ message: "error - email not found" });
    } else {
        const activationCode = Math.floor(Math.random() * 1_000_000);
    
        const emailExists = await db.collection("activation_codes").findOne({ email: email });

        if (emailExists) {
            await db.collection("activation_codes").deleteOne({ email: email });
        } 

        await db.collection("activation_codes").insertOne({ email: email, code: activationCode });   
    
        try {
            sendSMS(activationCode, phoneNumber);
            return res.status(200).send({ message: "We sent you a SMS" , status: 200 });  
        } catch (error) {
            return res.status(400).send({ message: "error sending SMS", status: 400 });
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
        return res.status(400).send({ message: "error - activation code not found or password mismatch", status: 400 });
    } else {
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        console.log(hashedNewPassword); 

        await db.collection("activation_codes").deleteOne({ code: activationCode });
        await db.collection("users").updateOne({ email: activationCodeExists.email }, { $set: { password: hashedNewPassword }});
        return res.status(200).send({ message: "success - new password created", status: 200 });
    }
});

export default router;