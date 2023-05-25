import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";

router.get("/api/admin/users", async (req, res) => {
    const allUsers = await db.collection("users").find().toArray();

    if (allUsers.length === 0) {
        return res.status(400).send({ message: "error - no users found", status: 400 });
    } else {
        return res.status(200).send({ data: allUsers, status: 200 });
    }
});

export default router;
