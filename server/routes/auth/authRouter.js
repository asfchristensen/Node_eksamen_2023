import { Router } from "express";
const router = Router();

import db from "../../database/connectionAtlas.js";
import bcrypt from "bcrypt";
import validator from "validator";

router.post("/api/auth/login", async (req, res) => {
    const { password, email } = req.body;
    const sanitizedPassword = validator.escape(password);
    const sanitizedEmail = validator.escape(email);
    
    const userExist = await db.collection("users").find({ email: sanitizedEmail }).toArray();

    if (userExist.length === 0 || !(await bcrypt.compare(sanitizedPassword, userExist[0].password))) {
        return res.status(401).send({ message: 'invalid email or password' });
    } else {
        const user = userExist[0]
        req.session.user = { username: user.username, email: user.email, role: user.role_id };
        return res.status(200).send({ data: req.session.user });
    }
});

router.get("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
        return res.status(200).send({ message: "Logging out", status: 200 });
    }); 
})

export default router;
