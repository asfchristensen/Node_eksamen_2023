import { Router } from "express";
const router = Router();

import db from "../database/connectionAtlas.js";

import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

router.get("/api/admin/users", async (req, res) => {
    const allUsers = await db.collection("users").find({ role_id: 2 }).toArray();

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

        const profileInfo = { 
            profilePicture: user.profilePicture, 
            username: user.username,
            memberSince: user.memberSince 
        };
        return res.status(200).send({ data: profileInfo, status: 200 });
    }
});

router.patch("/api/user/users/email", async (req, res) => {
    const { username, password, newPassword, confirmNewPassword, profilePicture } = req.body;
    const userEmail = req.session.user.email;

    if (!req.body) {
        return res.status(400).send({ message: "error - no user updated", status: 400 });
    }
    
    if (username) {
        const updatedUser = await db.collection("users").updateOne({ email: userEmail }, { $set: { username: username }});
        return res.status(200).send({ data: updatedUser, status: 200 });
    } 

    if (password && newPassword === confirmNewPassword) {
        const userExists = await db.collection("users").findOne({ email: userEmail });
        const oldPasswordIsVerified = await bcrypt.compare(password, userExists.password); 
        
        if (oldPasswordIsVerified) {
            const hashedNewPassword = await bcrypt.hash(newPassword, 12);
            const passwordToUpdate = await db.collection("users").updateOne({ email: userEmail }, { $set: { password: hashedNewPassword }});
            return res.status(200).send({ data: passwordToUpdate, message: "password updated", status: 200 });
        }
    } 

    if (profilePicture) {
        const updatedUser = await db.collection("users").updateOne({ email: userEmail }, { $set: { profilePicture: profilePicture }});
        return res.status(200).send({ data: updatedUser, status: 200 });
    }
    
    return res.status(400).send({ message: "error - no user updated", status: 400 }); 
});

router.delete("/api/user/users/email", async (req, res) => {
    const userToDelete = req.body;
    const userEmail = req.session.user.email;

    if (!userToDelete) {
        return res.status(400).send({ message: "error - no user deleted", status: 400 });
    } 
    
    if (userToDelete.deletePassword === userToDelete.confirmDeletePassword) {
        const userExists = await db.collection("users").findOne({ email:  userEmail });

        const passwordMatch = await bcrypt.compare(userToDelete.deletePassword, userExists.password); 

        if (!passwordMatch) {
            return res.status(400).send({ message: "error - failed to delete user", status: 400 });
        } else {
            const userDeleted = await db.collection("users").deleteOne({ email: userEmail });
            return res.status(200).send({ data: userDeleted, message: "success - user deleted", status: 200 });
        }

    } else {
        return res.status(400).send({ message: "error - no user deleted", status: 400 });
    }
});

router.delete("/api/admin/users/:id", async (req, res) => {
    const { id } = req.params; 

    if (!id) {
        return res.status(400).send({ message: "error - no user deleted", status: 400 });
    } else {
        const userToDelete = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
        return res.status(200).send({ data: id, message: "success - user deleted", status: 200 });
    }
});

export default router;
