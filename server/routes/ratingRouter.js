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
    console.log("req.body rating to public:",ratingToPublic.length);
    console.log("req.body rating to public:",ratingToPublic[0]._id);
    
    if (!ratingToPublic) {
        return res.status(400).send({ message: "error - no rating to make public", status: 400 });
    }
    
    if (ratingToPublic.length > 1) {
        console.log("er jeg her");
        const ratingIds = ratingToPublic.map(rating => new ObjectId(rating._id));
        console.log("array med id'er: ",ratingIds);

        const ratingsToUpdate = await db.collection("ratings").updateMany({ _id: { $in: ratingIds }}, { $set: { isPublic: true }});
        console.log(ratingsToUpdate);

        return res.status(200).send({ data: ratingToPublic, message: "Many ratings made public", status: 200 });
    } else {
        console.log("else - rating to public:",ratingToPublic.length);
        console.log("else - rating to public:",ratingToPublic[0]._id);
        const x = await db.collection("ratings").updateOne({ _id: new ObjectId(ratingToPublic[0]._id) }, { $set: { isPublic: true }});
        console.log(x);

        return res.status(200).send({ data: ratingToPublic, message: "One rating made public", status: 200 });
    }
});

router.delete("/api/admin/ratings", async (req, res) => {
    const ratingToDelete = req.body;
    
    if (!ratingToDelete) {
         return res.status(400).send({ message: "error - failed to delete rating", status: 400 })
    } else {
        await db.collection("ratings").deleteOne({ _id: new ObjectId(ratingToDelete._id) });
        return res.status(200).send({ message: "Rating deleted successfully", status: 200 }); 
    }
});

export default router;