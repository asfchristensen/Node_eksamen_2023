import { Router } from "express";
const router = Router();

import db from "../../database/connectionAtlas.js";
import bcrypt from "bcrypt";
import sendSMS from "../../util/sendSMS.js";

router.post("/api/all/auth/forgot-password", async (req, res) => {
    const { email, phoneNumber } = req.body;

    const userExists = await db.collection("users").findOne({ email: email });

    if (!userExists) {
        return res.status(400).send({ message: "error - email not found" });
    } else {
        const activationCode = Math.floor(Math.random() * 1_000_000);
        const expirationTime = Date.now() + 24 * 60 * 60 * 1000;

        const emailExists = await db.collection("activation_codes").findOne({ email: email });

        if (emailExists) {
            await db.collection("activation_codes").deleteOne({ email: email });
        } 

        const activationCodeToSave = await db.collection("activation_codes").insertOne(
            { email: email, code: activationCode, expirationDate: new Date(expirationTime) }
        );   
    
        if (!activationCodeToSave) {
            return res.status(400).send({ message: "error sending SMS", status: 400 });
        } else {
            sendSMS(activationCode, phoneNumber);
            return res.status(200).send({ message: "success - we sent you a SMS" , status: 200 }); 
        }
    } 
});

router.post("/api/all/auth/update-password", async (req, res) => {
    const { activationCode, newPassword, confirmPassword } = req.body;

    const activationCodeExists = await db.collection("activation_codes").findOne({ code: activationCode });
    
    if (!activationCodeExists || activationCodeExists.expirationDate < new Date() || newPassword !== confirmPassword) {
        return res.status(400).send({ message: "error - activation code not found, expired or password mismatch", status: 400 });
    } else {
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        await db.collection("activation_codes").deleteOne({ code: activationCode });
        await db.collection("users").updateOne({ email: activationCodeExists.email }, { $set: { password: hashedNewPassword }});
        return res.status(200).send({ message: "success - new password created", status: 200 });
    }
});

export default router;