import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";

import { ObjectId } from "mongodb";

router.get("/api/admin/feedback", async (req, res) => {
    const allFeedback = await db.collection("feedback").find().toArray();

    if (allFeedback.length === 0) {
        return res.status(400).send({ message: "error - no feedback found", status: 400 });
    } else {
        return res.status(200).send({ data: allFeedback, status: 200 });
    }
});

router.get("/api/user/feedback/email", async (req, res) => {
    const usersEmail = req.session.user.email;
    const answeredFeedback = await db.collection("feedback").find({ userEmail: usersEmail, isAnswered: true }).toArray();
    
    if (answeredFeedback.length === 0) {
        return res.status(400).send({ message: "error - no answers found", status: 400 });
    } else {
        return res.status(200).send({ data: answeredFeedback, message: "success - found answers to feedback(s)", status: 200 });
    }
});

router.post("/api/user/feedback", async (req, res) => {
    const { ...feedback } = req.body;
    
    if (!{ ...feedback }) {
        return res.status(400).send({ message: "error - invalid feedback", status: 400 })
    } else {

        const feedbackToSave = {
            isAnswered: false, 
            ... feedback,
            isDeleted: false 
        } 

        await db.collection("feedback").insertOne(feedbackToSave);
        return res.status(200).send({ data: feedbackToSave, message: "success - feedback created", status: 200 });
    }
});

router.patch("/api/admin/feedback/:id", async (req, res) => {
    const answerToSave = req.body;
    const { id } = req.params;
    
    if (!answerToSave) {
        return res.status(400).send({ message: "error - failed save answer", status: 400 });
    }

    const answerToFeedback = await db.collection("feedback").updateOne({ _id: new ObjectId(id) }, { $push: { answer: answerToSave.answer }});

    if (answerToFeedback.modifiedCount === 0) {
        return res.status(400).send({ message: "failed to update feedback", status: 400 });
    } else {
        const isAnswered = await db.collection("feedback").updateOne({ _id: new ObjectId(id) }, { $set: { isAnswered: true }});
        console.log(isAnswered);
        return res.status(200).send({ message: "success - updated feedback", status: 200 });
    }  
});

export default router;