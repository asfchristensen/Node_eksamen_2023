import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";

router.get("/api/events", async (req, res) => {
    const events = await db.collection("events").find().toArray();
    if (!events) {
        return res.status(400).send({ message: "error - failed to fetch events" });
    } else {
        return res.status(200).send({ data: events });
    }
});

router.post("/api/events", async (req, res) => {
    const event = req.body; 
    
    if (!req.body) {
        return res.status(400).send({ message: "error - invalid event", status: 400 })
    }

    if (Array.isArray(req.body)) {
        await db.collection("events").insertMany(req.body);
        return res.status(200).send({ data: event, message: "many events created", status: 200 });
    } else {
        await db.collection("events").insertOne(req.body);
        return res.status(200).send({ data: event, message: "one event created", status: 200 });
    }
});

export default router;