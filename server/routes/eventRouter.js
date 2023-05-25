import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";

import { ObjectId } from "mongodb";
// alle true + false - SKAL SLETTES 
router.get("/api/all/events", async (req, res) => {
    const events = await db.collection("events").find().toArray();

    if (events.length === 0) {
        return res.status(400).send({ message: "error - failed to fetch events", status: 400 });
    } else {
        return res.status(200).send({ data: events, status: 200 });
    }
});

router.get("/api/all/events/public", async (req, res) => {
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
    }

    // kun til test - slet bagefter med many 
    if (Array.isArray(event)) {
        await db.collection("events").insertMany(event);

        return res.status(200).send({ data: event, message: "Many events created", status: 200 });
    } else {
        await db.collection("events").insertOne(event);

        return res.status(200).send({ data: event, message: "One event created", status: 200 });
    }
});

router.patch("/api/admin/events", async (req, res) => {
    const eventToPublic = req.body;
    console.log("req.body event to public:",eventToPublic.length);
    console.log("req.body event to public:",eventToPublic[0]._id);
    
    
    if (!eventToPublic) {
        return res.status(400).send({ message: "error - failed to make event public", status: 400 });
    }
    
    if (eventToPublic.length > 1) {
        console.log("er jeg her");
        const eventIds = eventToPublic.map(event => new ObjectId(event._id));
        console.log("array med id'er: ",eventIds);

        const updater = await db.collection("events").updateMany({ _id: { $in: eventIds }}, { $set: { isPublic: true }});
        console.log(updater);

        return res.status(200).send({ data: eventToPublic, message: "Many events made public", status: 200 });
    } else {
        console.log("else - event to public:",eventToPublic.length);
        console.log("else - event to public:",eventToPublic[0]._id);
        const x = await db.collection("events").updateOne({ _id: new ObjectId(eventToPublic[0]._id) }, { $set: { isPublic: true }});
        console.log(x);
        return res.status(200).send({ data: eventToPublic, message: "One event made public", status: 200 });
    }
    
});

router.delete("/api/admin/events", async (req, res) => {
    const eventToDelete = req.body;
    console.log("event to delete: ", eventToDelete);
    console.log("id:", eventToDelete._id);

    if (!eventToDelete) {
        return res.status(400).send({ message: "error - failed to delete event", status: 400 });
    } else {
        await db.collection("events").deleteOne({_id: new ObjectId(eventToDelete._id)});
        return res.status(200).send({ message: "Event deleted successfully", status: 200 });
    }
});

export default router;