import { Router } from "express";
const router = Router();

import { ObjectId } from "mongodb";

import db from "../database/connectionAtlas.js";

router.get("/api/all/publicRecipes", async (req, res) => {
    const publicRecipes = await db.collection("public_recipes").find().toArray();

    if(publicRecipes.length === 0) {
        return res.status(400).send({ message: "error - unable to find recipes", status: 400 });
    } else {
        return res.status(200).send({ data: publicRecipes, status: 200 });
    }
});

router.post("/api/user/publicRecipes", async (req, res) => {
    const publicRecipeInfo = req.body;
    console.log("Hello", req.body);

    if (!publicRecipeInfo) {
        return res.status(400).send({ message: "error - invalid recipe", status: 400 });
    } else {
        const publicRecipe = await db.collection("public_recipes").insertOne(publicRecipeInfo);
        return res.status(200).send({ data: publicRecipe, status: 200 });
    }
});

router.patch("/api/user/publicRecipes/likes", async (req, res) => {
    const { email, id } = req.body;
    
    if (!email || !id) {
        return res.status(400).send({ message: "error - invalid email or id", status: 400 });
    }

    const chosenRecipe = await db.collection("public_recipes").findOne({ _id: new ObjectId(id) });
    console.log("chosen ",chosenRecipe);
    const recipeLikes = chosenRecipe.likes;
    console.log("likes array", recipeLikes);

    if (recipeLikes === undefined) {
        const likedRecipe = await db.collection("public_recipes").updateOne({ _id: new ObjectId(id) }, { $push: { likes: email }});
        console.log(likedRecipe);
        return res.status(200).send({ data: likedRecipe, status: 200 });
    }

    const emailExists = recipeLikes.findIndex(existingEmail => existingEmail === email);
    console.log(emailExists);

    if (emailExists === -1 ) {
        const likedRecipe = await db.collection("public_recipes").updateOne({ _id: new ObjectId(id) }, { $push: { likes: email }});
        console.log(likedRecipe);
        return res.status(200).send({ data: likedRecipe, status: 200 });
    } else {
        return res.status(400).send({ message: "error - you already liked this recipe", status: 400 });
    }
});


router.patch("/api/user/publicRecipes/dislike", async (req, res) => {
    const { email, id } = req.body;
    
    if (!email || !id) {
        return res.status(400).send({ message: "error - invalid email or id", status: 400 });
    }

    const chosenRecipe = await db.collection("public_recipes").findOne({ _id: new ObjectId(id) });
    console.log("chosen ",chosenRecipe);
    
    const dislikedRecipe = await db.collection("public_recipes").updateOne({ _id: new ObjectId(id) }, { $pull: { likes: email }});

    if (dislikedRecipe.modifiedCount === 1) {
        return res.status(200).send({ data: dislikedRecipe, status: 200 });
    } else {
        return res.status(400).send({ message: "error - unable to dislike public recipe", status: 400 });
    }
});

router.patch("/api/user/publicRecipes/comment", async (req, res) => {
    const { email, id, comment } = req.body;
    
    if (!email || !id) {
        return res.status(400).send({ message: "error - invalid email or id", status: 400 });
    }

    const chosenRecipe = await db.collection("public_recipes").findOne({ _id: new ObjectId(id) });
    console.log("chosen ",chosenRecipe);
   
    const commentedRecipe = await db.collection("public_recipes").updateOne({ _id: new ObjectId(id) }, { $push: { comments: { email: email, comment: comment} }});
    console.log("status for creating comment to recipe", commentedRecipe);

    if (commentedRecipe.modifiedCount === 1) {
        return res.status(200).send({ data: commentedRecipe, status: 200 });
    } else {
        return res.status(400).send({ message: "error - unable to comment public recipe", status: 400 });
    }
});

export default router;
