import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";


router.get("/api/users", async (req, res) => {
    const allUsers = await db.collection("users").find().toArray();
    res.status(200).send({ data: allUsers });
});


export default router;
