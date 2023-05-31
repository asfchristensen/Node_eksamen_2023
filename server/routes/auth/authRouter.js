import { Router } from "express";
const router = Router();

import db from "../../database/connectionAtlas.js";
import bcrypt from "bcrypt";

router.post("/api/all/auth/login", async (req, res) => {
    const { password, email } = req.body;
    
    const userExist = await db.collection("users").findOne({ email: email });
    console.log("userExist", userExist);

    if (!userExist && await bcrypt.compare(password, userExist.password)) {
        return res.status(400).send({ message: "invalid email or password", status: 400 });
    } else {
        req.session.user = { 
            username: userExist.username, 
            email: userExist.email, 
            role: userExist.role_id 
        };

        return res.status(200).send({ data: req.session.user, status: 200 });
    }
});

router.get("/api/all/auth/logout", (req, res) => {
    req.session.destroy(() => {
        return res.status(200).send({ message: "Logging out", status: 200 });
    }); 
})

export default router;