import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";

import bcrypt from "bcrypt";

router.get("/api/admin/users", async (req, res) => {
    const allUsers = await db.collection("users").find().toArray();

    if (allUsers.length === 0) {
        return res.status(400).send({ message: "error - no users found", status: 400 });
    } else {
        return res.status(200).send({ data: allUsers, status: 200 });
    }
});

// Denne skal slettes
router.get("/api/user/users", async (req, res) => {
    const userEmail = req.session.user.email
    const user = await db.collection("users").findOne({ email: userEmail });
    console.log("user exist:", user);
    return res.status(200).send({ data: user, status: 200 });
});

router.patch("/api/user/users", async (req, res) => {
    const userToUpdate = req.body;
    console.log(userToUpdate);
    const userEmail = req.session.user.email;
    console.log(userEmail);
    console.log(userToUpdate.username);

    if (!userToUpdate) {
        return res.status(400).send({ message: "error - no user updated", status: 400 });
    }
    
    if (userToUpdate.username) {
        const updatedUser = await db.collection("users").updateOne({ email: userEmail }, {$set: {username: userToUpdate.username}});
        console.log("updated user: ",updatedUser);
        return res.status(200).send({ data: updatedUser, status: 200 });
    }

    if (userToUpdate.password && userToUpdate.newPassword === userToUpdate.confirmNewPassword) {
        console.log("første if");
        const userExists = await db.collection("users").findOne({ email: userEmail });
        console.log(userExists.email);
        const oldPasswordIsVerified = await bcrypt.compare(userToUpdate.password, userExists.password); 
        console.log(oldPasswordIsVerified);
        
        if (oldPasswordIsVerified) {
            console.log("næste if");
            const hashedNewPassword = await bcrypt.hash(userToUpdate.newPassword, 12);
            const passwordToUpdate = await db.collection("users").updateOne({ email: userEmail }, { $set: { password: hashedNewPassword }});
            return res.status(200).send({ data: passwordToUpdate, message: "password updated", status: 200 });
        }
    }        
});

router.delete("/api/user/users", async (req, res) => {
    const userToDelete = req.body;
    console.log("user to delete: ",userToDelete);

    if (!userToDelete) {
        return res.status(400).send({ message: "error - no user deleted", status: 400 });
    } else {
        const userEmail = userToDelete.email;
        const username = req.session.user.username;

        // + password
        
        const deleteUser = await db.collection("users").deleteOne({ email: userEmail }, { username: username});
        return res.status(200).send({ data: deleteUser, message: "user deleted", status: 200 });
    }
});

export default router;
