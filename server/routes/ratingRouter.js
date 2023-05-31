import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";

import { ObjectId } from "mongodb";

router.get("/api/all/ratings/public", async (req, res) => {
    const publicRatings = await db.collection("ratings").find({ isPublic: true }).toArray();

    if (publicRatings.length === 0) {
        return res.status(400).send({ message: "error - no ratings found", status: 400 });
    } else {
        return res.status(200).send({ data: publicRatings, status: 200 });
    }
});

router.get("/api/admin/ratings/not-public", async (req, res) => {
    const notPublicRatings = await db.collection("ratings").find({ isPublic: false }).toArray();

    if (notPublicRatings.length === 0) {
        return res.status(400).send({ message: "error - no ratings found", status: 400 });
    } else {
        return res.status(200).send({ data: notPublicRatings, status: 200 });
    }
});

router.post("/api/user/ratings", async (req, res) => {
    const { ...rating } = req.body;
    
    if (!{ ...rating }) {
        return res.status(400).send({ message: "error - invalid rating", status: 400 });
    } else {

        const ratingToSave = {
            isPublic: false, 
            ...rating,
            isDeleted: false 
        };

        await db.collection("ratings").insertOne(ratingToSave);
        return res.status(200).send({ data: ratingToSave, message: "success - rating created", status: 200 });
    }
});

router.patch("/api/admin/ratings", async (req, res) => {
    const ratingToPublic = req.body;
    
    if (!ratingToPublic) {
        return res.status(400).send({ message: "error - no rating to make public", status: 400 });
    }
    
    if (ratingToPublic.length > 1) {
        const ratingIds = ratingToPublic.map(rating => new ObjectId(rating._id));

        await db.collection("ratings").updateMany({ _id: { $in: ratingIds }}, { $set: { isPublic: true }});
        return res.status(200).send({ data: ratingToPublic, message: "success - many ratings made public", status: 200 });
    } else {
        await db.collection("ratings").updateOne({ _id: new ObjectId(ratingToPublic[0]._id) }, { $set: { isPublic: true }});
        return res.status(200).send({ data: ratingToPublic, message: "success - one rating made public", status: 200 });
    }
});

router.delete("/api/admin/ratings/:id", async (req, res) => {
    const { id } = req.params;
    
    if (!id) {
         return res.status(400).send({ message: "error - failed to delete rating", status: 400 })
    } else {
        await db.collection("ratings").deleteOne({ _id: new ObjectId(id) });
        return res.status(200).send({ message: "success - rating deleted", status: 200 }); 
    }
});

export default router;