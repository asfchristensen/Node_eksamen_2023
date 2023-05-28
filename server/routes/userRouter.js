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

router.get("/api/user/users/email", async (req, res) => {
    const userEmail = req.session.user.email

    if (!userEmail) {
        return res.status(400).send({ message: "error - no user with that email", status: 400 });
    } else {
        const user = await db.collection("users").findOne({ email: userEmail });

        const profileInfo = { profilePicture: user.profilePicture, memberSince: user.memberSince };
        return res.status(200).send({ data: profileInfo, status: 200 });
    }
});

router.patch("/api/user/users/email", async (req, res) => {
    const userToUpdate = req.body;
    const userEmail = req.session.user.email;

    if (!userToUpdate) {
        return res.status(400).send({ message: "error - no user updated", status: 400 });
    }
    
    if (userToUpdate.username) {
        const updatedUser = await db.collection("users").updateOne({ email: userEmail }, { $set: { username: userToUpdate.username }});
        return res.status(200).send({ data: updatedUser, status: 200 });
    } 

    if (userToUpdate.password && userToUpdate.newPassword === userToUpdate.confirmNewPassword) {
        const userExists = await db.collection("users").findOne({ email: userEmail });
        const oldPasswordIsVerified = await bcrypt.compare(userToUpdate.password, userExists.password); 
        
        if (oldPasswordIsVerified) {
            const hashedNewPassword = await bcrypt.hash(userToUpdate.newPassword, 12);
            const passwordToUpdate = await db.collection("users").updateOne({ email: userEmail }, { $set: { password: hashedNewPassword }});
            return res.status(200).send({ data: passwordToUpdate, message: "password updated", status: 200 });
        }
    } 

    if (userToUpdate.profilePicture) {
        const updatedUser = await db.collection("users").updateOne({ email: userEmail }, { $set: { profilePicture: userToUpdate.profilePicture }});
        return res.status(200).send({ data: updatedUser, status: 200 });
    }
    
    return res.status(400).send({ message: "error - no user updated", status: 400 }); 
});

router.delete("/api/both/users/email", async (req, res) => {
    const userToDelete = req.body;

    if (!userToDelete) {
        return res.status(400).send({ message: "error - no user deleted", status: 400 });
    } 
    
    if (userToDelete.deletePassword === userToDelete.confirmDeletePassword) {
        const userExists = await db.collection("users").findOne({ email:  userToDelete.email });

        const passwordMatch = await bcrypt.compare(userToDelete.deletePassword, userExists.password); 

        if (!passwordMatch) {
            return res.status(400).send({ message: "failed to delete user", status: 400 });
        } else {
            const userDeleted = await db.collection("users").deleteOne({ email: userToDelete.email });
            return res.status(200).send({ data: userDeleted, message: "user deleted", status: 200 });
        }

    } else {
        return res.status(400).send({ message: "error - no user deleted", status: 400 });
    }
});

export default router;
