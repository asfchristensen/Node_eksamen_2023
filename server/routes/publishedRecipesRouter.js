import { Router } from "express";
const router = Router();

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
        res.status(400).send({ message: "invalid recipe" })
    } else {
        const publishedRecipe = await db.collection("published_recipes").insertOne({...recipeToPublish});
        res.status(200).send({ data: publishedRecipe });
    }
});

export default router;