import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";

router.get("/api/both/messages", async (req, res) => {
    const messages = await db.collection("chat_messages").find().toArray();

    if (!messages) {
        return res.status(400).send({ message: "error - couldn't get any message", status: 400 });
    } else {
        return res.status(200).send({ data: messages });
    }
});

router.post("/api/both/messages", async (req, res) => {
    const messageData = req.body;
    const messageDataToSave = await db.collection("chat_messages").insertOne(messageData);

    if (!messageDataToSave) {
        return res.status(400).send({ message: "error - failed to save message" });
    } else {
        return res.status(200).send({ data: messageDataToSave });
    }
});

export default router;