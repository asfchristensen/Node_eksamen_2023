import { Router } from "express";
const router = Router();

import { ObjectId } from "mongodb";

import db from "../database/connectionAtlas.js";

router.get("/api/publishedRecipes", async (req, res) => {
    const publishedRecipesList = await db.collection("published_recipes").find().toArray();

    if(publishedRecipesList.length === 0) {
        res.status(400).send({ message: "error - unable to find recipes" });
    } else {
        res.status(200).send({ data: publishedRecipesList });
    }
});

router.post("/api/publishedRecipes", async (req, res) => {
    const { ...recipeToPublish } = req.body;
    console.log("Hello", req.body);

    if (!{...recipeToPublish}) {
        res.status(400).send({ message: "invalid recipe" });
    } else {
        const publishedRecipe = await db.collection("published_recipes").insertOne({...recipeToPublish});
        res.status(200).send({ data: publishedRecipe });
    }
});

// lav et like
router.patch("/api/publishedRecipes/likes", async (req, res) => {
    const { email, id } = req.body;
    
    if (!email || !id) {
        return res.status(400).send({ message: "invalid email or id" });
    }

    // skal over i utility efter merge
    const chosenRecipe = await db.collection("published_recipes").findOne({ _id: new ObjectId(id) });
    console.log("chosen ",chosenRecipe);
    const recipeLikes = chosenRecipe.likes;
    console.log("likes array", recipeLikes);

    if (recipeLikes === undefined) {
        // published recipe id 
        const likedRecipe = await db.collection("published_recipes").updateOne({ _id: new ObjectId(id) }, { $push: { likes: email }});
        console.log(likedRecipe);
        return res.status(200).send({ data: likedRecipe });
    }

    const emailExists = recipeLikes.findIndex(existingEmail => existingEmail === email);
    console.log(emailExists);

    if (emailExists === -1 ) {
        const likedRecipe = await db.collection("published_recipes").updateOne({ _id: new ObjectId(id) }, { $push: { likes: email }});
        console.log(likedRecipe);
        res.status(200).send({ data: likedRecipe });
    } else {
        res.status(400).send({ message: "error - you already liked this published recipe" });
    }
});

// lav et unike

router.patch("/api/publishedRecipes/dislike", async (req, res) => {
    const { email, id } = req.body;
    
    if (!email || !id) {
        return res.status(400).send({ message: "invalid email or id" });
    }

    // skal over i utility efter merge
    const chosenRecipe = await db.collection("published_recipes").findOne({ _id: new ObjectId(id) });
    console.log("chosen ",chosenRecipe);
    
    const dislikedRecipe = await db.collection("published_recipes").updateOne({ _id: new ObjectId(id) }, { $pull: { likes: email }});
    console.log(dislikedRecipe.modifiedCount);
    if (dislikedRecipe.modifiedCount === 1) {
        res.status(200).send({ data: dislikedRecipe });
    } else {
        res.status(400).send({ message: "error - unable to dislike published recipe" });
    }
    
    
});

export default router;