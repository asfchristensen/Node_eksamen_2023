import Router from "express";
const router = Router();

import db from "../database/connectionAtlas.js"


router.get("/api/user/recipes", async (req, res) => {
    const userEmail = req.session.user.email;

    const user = await db.collection("users").findOne({ email: userEmail }); 

    if (!user) {
        return res.status(400).send({ message: "error - no user found with that email", status: 400 });
    } else {
        const recipes = user.recipes;
        return res.status(200).send({ data: recipes, status: 200 });
    } 
});

router.patch("/api/user/recipes", async (req, res) => {
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

router.patch("/api/user/recipes/make-public", async (req, res) => {
    const recipeToPublic = req.body;  
    const userEmail = req.session.user.email;

    console.log("update to public ",req.body)   
    
    if (!recipeToPublic) {
        return res.status(400).send({ message: "error - unables to make recipe public", status: 400 })
    } else {
        await db.collection("users").updateOne(
            { email: userEmail, "recipes.procedure": recipeToPublic.procedure }, 
            { $set: { "recipes.$.isPublic" : recipeToPublic.isPublic }}
        );
        return res.status(200).send({ data: recipeToPublic, status: 200 });
    }
});

router.patch("/api/users/recipes/update-recipe", async (req, res) => {
    const { title, picURL, procedure, ingredients } = req.body;
    console.log("Email:", req.session.user.email);
    console.log("Title:", title);
    console.log("PicURL:", picURL);
  
    const updateFields = {};
    if (procedure && procedure !== "") {
        updateFields["recipes.$.procedure"] = procedure;
    }
    if (ingredients && ingredients !== "") {
        updateFields["recipes.$.ingredients"] = ingredients;
    }
    console.log("Update Fields:", updateFields);

    const updatedUser = await db.collection("users").updateOne(
        {
            email: req.session.user.email,
            "recipes.title": title,
            "recipes.picURL": picURL
        },
        { $set: updateFields }
    );

    if (updatedUser.modifiedCount !== 1) {
        return res.status(400).send({ data: updatedUser, message: "Recipe not found" , status: 400 });
    } else {
        return res.status(200).send({ data: updatedUser ,message: "Recipe updated successfully", status: 200 });
    }
});

router.patch("/api/user/recipes/delete-recipe", async (req, res) => {
    const recipeToDelete = req.body;

    if (!recipeToDelete) {
        return res.status(400).send({ message: "error - failed to delete recipe", status: 400 })
   } else {
       const deleted = await db.collection("users").updateOne({ email: req.session.user.email}, {$pull: { recipes: { procedure: recipeToDelete.procedure }}});
       console.log("deleted", deleted);
       return res.status(200).send({ message: "Public recipe deleted successfully", status: 200 }); 
   }

});




export default router;