import Router from "express";
const router = Router();

import db from "../database/connectionAtlas.js"
import validator from "validator";


router.get("/api/user/recipes", async (req, res) => {
    const user = await db.collection("users").findOne({ email: req.session.user.email }); 

    if (!user) {
        return res.status(400).send({ message: "error - no user found with that email", status: 400 });
    } else {
        const recipes = user.recipes;
        return res.status(200).send({ data: recipes, status: 200 });
    } 
});

router.patch("/api/user/recipes", async (req, res) => {
    const { isPublic, title, category, picURL, ingredients, procedure} = req.body; 
    const sanitizedTitle = validator.escape(title);  
    const sanitizedCategory = validator.escape(category);  
    const sanitizedPicURL = picURL;  
    const sanitizedIngredients = validator.escape(ingredients);  
    const sanitizedProcedure = validator.escape(procedure);  
        
    const sanitizedRecipe = { isPublic: isPublic, title: sanitizedTitle, category: sanitizedCategory, picURL: sanitizedPicURL, ingredients: sanitizedIngredients, procedure: sanitizedProcedure};
    
    if (!sanitizedRecipe) {
        return res.status(400).send({ message: "error - invalid recipe", status: 400 })
    } else {
        await db.collection("users").updateOne({ email: req.session.user.email }, { $push: { recipes: sanitizedRecipe }});
        return res.status(200).send({ data: sanitizedRecipe, status: 200 });
    }
});

router.patch("/api/user/recipes/make-public", async (req, res) => {
    const recipeToPublic = req.body;  
    console.log("update to public ",req.body)   
    
    if (!recipeToPublic) {
        return res.status(400).send({ message: "error - unables to make recipe public", status: 400 })
    } else {
        await db.collection("users").updateOne(
            { email: req.session.user.email, "recipes.procedure": recipeToPublic.procedure }, 
            { $set: { "recipes.$.isPublic" : recipeToPublic.isPublic }}
        );
        return res.status(200).send({ data: recipeToPublic, status: 200 });
    }
});


export default router;