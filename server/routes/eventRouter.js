import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";

import { ObjectId } from "mongodb";

router.get("/api/both/events/public", async (req, res) => {
    const publicEvents = await db.collection("events").find({ isPublic: true }).toArray();

    if (publicEvents.length === 0) {
        return res.status(400).send({ message: "error - failed to fetch events", status: 400 });
    } else {
        return res.status(200).send({ data: publicEvents, status: 200 });
    }
});

router.get("/api/admin/events/not-public", async (req, res) => {
    const notPublicEvents = await db.collection("events").find({ isPublic: false }).toArray();

    if (notPublicEvents.length === 0) {
        return res.status(400).send({ message: "error - failed to fetch events", status: 400 });
    } else {
        return res.status(200).send({ data: notPublicEvents, status: 200 });
    }
});

router.post("/api/user/events", async (req, res) => {
    const event = req.body; 
    
    if (!event) {
        return res.status(400).send({ message: "error - invalid event", status: 400 })
    } else {
        await db.collection("events").insertOne(event);
        return res.status(200).send({ data: event, message: "success - event created", status: 200 });
    }
});

router.patch("/api/admin/events", async (req, res) => {
    const { ...event } = req.body;
  
    const eventToPublic = { 
        isPublic: false, 
        ...event, 
        isDeleted: false 
    };

    if (!eventToPublic) {
        return res.status(400).send({ message: "error - failed to make event public", status: 400 });
    }
    
    if (eventToPublic.length > 1) {
        const eventIds = eventToPublic.map(event => new ObjectId(event._id));
        await db.collection("events").updateMany({ _id: { $in: eventIds }}, { $set: { isPublic: true }});
        return res.status(200).send({ data: eventToPublic, message: "Many events made public", status: 200 });
    } else {
        await db.collection("events").updateOne({ _id: new ObjectId(eventToPublic[0]._id) }, { $set: { isPublic: true }});
        return res.status(200).send({ data: eventToPublic, message: "One event made public", status: 200 });
    }
});

router.delete("/api/admin/events/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "error - failed to delete event", status: 400 });
    } else {
        await db.collection("events").deleteOne({_id: new ObjectId(id)});
        return res.status(200).send({ message: "success - event deleted successfully", status: 200 });
    }
});

export default router;