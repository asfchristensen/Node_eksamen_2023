import Router from "express";
const router = Router();

import db from "../database/connectionAtlas.js"
import validator from "validator";


router.get("/api/recipes/:mail", async (req, res) => {
    const { mail } = req.params;
    console.log(mail);
    const users = await db.collection("users").findOne({ email: mail }); 
    console.log(users);

    if (!users) {
        console.log("No user with email");
        res.status(400).send({ message: "No user found with that email" });
    } else {
        const recipes = users.recipes;
        res.status(200).send({ data: recipes });
    } 
});

router.post("/api/recipes", async (req, res) => {
    const { title, category, picURL, ingredients, procedure} = req.body; 
    const sanitizedTitle = validator.escape(title);  
    const sanitizedCategory = validator.escape(category);  
    const sanitizedPicURL = picURL;  
    const sanitizedIngredients = validator.escape(ingredients);  
    const sanitizedProcedure = validator.escape(procedure);  
    
    console.log("body: ", req.body);
    console.log("users email: ", req.session.object.email);

    const sanitizedRecipe = { title: sanitizedTitle, category: sanitizedCategory, picURL: sanitizedPicURL, ingredients: sanitizedIngredients, procedure: sanitizedProcedure};
    
    if (!sanitizedRecipe) {
        res.status(400).send({ message: "invalid recipe" })
    } else {
        await db.collection('users').updateOne({ email: req.session.object.email }, { $push: { recipes: sanitizedRecipe }});
        res.status(200).send({ data: sanitizedRecipe });
    }
   
});

export default router;