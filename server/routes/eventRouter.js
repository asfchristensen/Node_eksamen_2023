import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";

router.post("/api/events", async (req, res) => {
    const { date, eventName, startTime, endTime, category, picURL, address } = req.body; 
    console.log("body: ", req.body);
    
    //const eventToSave = {date: date, eventName: eventName, startTime: startTime, endTime: endTime, category: category, picURL: picURL, address: address };
    if (!req.body) {
        res.status(400).send({ message: "error - invalid event" })
    } else {
        await db.collection("events").insertOne(req.body);
        res.status(200).send({ data: req.body, message: "event created" });
    }
});

export default router;