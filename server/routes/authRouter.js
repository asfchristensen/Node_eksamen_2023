import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js"
import bcrypt from "bcrypt";
import validator from "validator";

// login
router.post("/api/auth/login", async (req, res) => {
    const { password, email } = req.body;
    const sanitizedPassword = validator.escape(password);
    const sanitizedEmail = validator.escape(email);
    console.log("req.body: ", req.body);
    
    const userExist = await db.collection("users").find({ email: sanitizedEmail }).toArray();
    console.log("User exist: ", userExist);

    if (userExist.length === 0 || !(await bcrypt.compare(sanitizedPassword, userExist[0].password))) {
        // log in
        console.log("invalid user : ", userExist);

        res.status(401).send({ message: 'invalid email or password' });

    } else {
        // log in
        console.log("logged in: ", userExist);

        // set session
        const user = userExist[0]
        req.session.object = { username: user.username, email: user.email, role: user.role_id };
        console.log("session: ", req.session.object);
        res.status(200).send({ data: userExist });
    }
});

// logout
router.get("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
        res.send({message: "Logging out"});
    }); 
})

// signup
router.post("/api/auth/signup", async (req, res) => {
    const { username, password, email } = req.body;
    const sanitizedUsername = validator.escape(username);
    const sanitizedPassword = validator.escape(password);
    const sanitizedEmail = validator.escape(email);
    console.log("2 ",req.body);
    
    const userExist = await db.collection("users").find({ email: sanitizedEmail }).toArray();
    console.log("3 ", userExist);

    if (userExist.length === 0) {
        const hashedPassword = await bcrypt.hash(sanitizedPassword, 12);
        const userRole = 2;

        const newUser = { username: sanitizedUsername, email: sanitizedEmail, password: hashedPassword, role_id: userRole };
        console.log("4 ",newUser);

        db.collection("users").insertOne(newUser);

        res.status(200).send({ data: sanitizedUsername });
    } else {
        console.log("Signup failed");
        res.status(409).send({ message: "error" });
    }
});

export default router;
