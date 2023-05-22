import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";

router.get("/api/messages", async (req, res) => {
    const messages = await db.collection("chat_messages").find().toArray();
    //console.log("Messages from backend: ", messages);
    return res.status(200).send({ data: messages });
});

router.post("/api/messages", async (req, res) => {
    const messageData = req.body;
    //console.log(messageData);
    const messageDataToSave = await db.collection("chat_messages").insertOne(messageData);
    //console.log("MessageData: ", messageDataToSave);

    if (!messageDataToSave) {
        return res.status(400).send({ message: "error - failed to save message" });
    } else {
        return res.status(200).send({ data: messageDataToSave });
    }
});

export default router;