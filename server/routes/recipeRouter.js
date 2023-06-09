import Router from "express";
const router = Router();

import db from "../database/connectionAtlas.js"

router.get("/api/user/users/recipes", async (req, res) => {
    const userEmail = req.session.user.email;

    const user = await db.collection("users").findOne({ email: userEmail }); 

    if (!user) {
        return res.status(400).send({ message: "error - no user found with that email", status: 400 });
    } else {
        const recipes = user.recipes;
        return res.status(200).send({ data: recipes, status: 200 });
    } 
});

router.patch("/api/user/users/recipes", async (req, res) => {
    const { ...recipe } = req.body;
    const userEmail = req.session.user.email; 
             
    if (!{ ...recipe }) {
        return res.status(400).send({ message: "error - invalid recipe", status: 400 });
    } else {

        const recipeToSave = { 
            isPublic: false,
            ...recipe, 
            isDeleted: false 
        };

        await db.collection("users").updateOne({ email: userEmail }, { $push: { recipes: recipeToSave }});
        return res.status(200).send({ data: recipeToSave, status: 200 });
    }
});

router.patch("/api/user/users/recipes/make-public", async (req, res) => {
    const recipeToPublic = req.body;  
    const userEmail = req.session.user.email;
    
    if (!recipeToPublic) {
        return res.status(400).send({ message: "error - unables to make recipe public", status: 400 });
    } else {
        await db.collection("users").updateOne(
            { email: userEmail, "recipes.procedure": recipeToPublic.procedure }, 
            { $set: { "recipes.$.isPublic" : recipeToPublic.isPublic }}
        );
        return res.status(200).send({ data: recipeToPublic, status: 200 });
    }
});

router.patch("/api/user/users/recipes/update-recipe", async (req, res) => {
    const { title, picURL, procedure, ingredients, isPublic } = req.body;
    const userEmail = req.session.user.email;
   
    const updateRecipeFields = {};
    const updatePublicRecipeFields = {};

    if (procedure && procedure !== "") {
        updateRecipeFields["recipes.$.procedure"] = procedure;
        updatePublicRecipeFields.procedure = procedure;
    }
    
    if (ingredients && ingredients !== "") {
        updateRecipeFields["recipes.$.ingredients"] = ingredients;
        updatePublicRecipeFields.ingredients = ingredients;
    }

    const updatedRecipe = await db.collection("users").updateOne(
        { email: userEmail, "recipes.title": title, "recipes.picURL": picURL },
        { $set: updateRecipeFields }
    );

    if (updatedRecipe.modifiedCount !== 1) {
        return res.status(400).send({ data: updatedRecipe, message: "error - recipe not found" , status: 400 });
    }
    
    if (isPublic) {
        const updatedPublicRecipe = await db.collection("public_recipes").updateOne(
            { title: title, picURL: picURL },
            { $set: updatePublicRecipeFields }
        );
    
        if (updatedPublicRecipe.modifiedCount !== 1) {
            return res.status(400).send({ data: updatedPublicRecipe, message: "error - recipe not found" , status: 400 });
        }
    }

    return res.status(200).send({ message: "success - recipe updated", status: 200 });  
});

router.patch("/api/user/users/recipes/delete-recipe", async (req, res) => {
    const recipeToDelete = req.body;

    if (!recipeToDelete) {
        return res.status(400).send({ message: "error - failed to delete recipe", status: 400 })
    } else {
       await db.collection("users").updateOne(
        { email: req.session.user.email}, {$pull: { recipes: { procedure: recipeToDelete.procedure }}}
        );
        return res.status(200).send({ message: "success - public recipe deleted", status: 200 }); 
    }
});

export default router;