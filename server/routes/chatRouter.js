import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";

router.get("/api/both/chat_messages", async (req, res) => {
    const messages = await db.collection("chat_messages").find().toArray();

    if (!messages) {
        return res.status(400).send({ message: "error - couldn't get any message", status: 400 });
    } else {
        return res.status(200).send({ data: messages, status: 200 });
    }
});

router.post("/api/both/chat_messages", async (req, res) => {
    const messageData = req.body;
    const messageDataToSave = await db.collection("chat_messages").insertOne(messageData);

    if (!messageDataToSave) {
        return res.status(400).send({ message: "error - failed to save message", status: 400 });
    } else {
        return res.status(200).send({ data: messageDataToSave, status: 200 });
    }
});

export default router;