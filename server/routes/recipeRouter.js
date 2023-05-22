import Router from "express";
const router = Router();

import db from "../database/connectionAtlas.js"
import validator from "validator";


router.get("/api/recipes/:mail", async (req, res) => {
    const { mail } = req.params;
    //console.log(mail);
    const user = await db.collection("users").findOne({ email: mail }); 
    //console.log(user);

    if (!user) {
        //console.log("No user with email");
        res.status(400).send({ message: "No user found with that email" });
    } else {
        const recipes = user.recipes;
        res.status(200).send({ data: recipes });
    } 
});

router.patch("/api/recipes", async (req, res) => {
    const { isPublished, title, category, picURL, ingredients, procedure} = req.body; 
    const sanitizedTitle = validator.escape(title);  
    const sanitizedCategory = validator.escape(category);  
    const sanitizedPicURL = picURL;  
    const sanitizedIngredients = validator.escape(ingredients);  
    const sanitizedProcedure = validator.escape(procedure);  
    
    //console.log("body: ", req.body);
    
    const sanitizedRecipe = { isPublished: isPublished, title: sanitizedTitle, category: sanitizedCategory, picURL: sanitizedPicURL, ingredients: sanitizedIngredients, procedure: sanitizedProcedure};
    
    if (!sanitizedRecipe) {
        res.status(400).send({ message: "invalid recipe" })
    } else {
        await db.collection("users").updateOne({ email: req.session.user.email }, { $push: { recipes: sanitizedRecipe }});
        res.status(200).send({ data: sanitizedRecipe });
    }
});

// ændre fra ...recipe til kun at være procedure og isPublished (HUSK frontend også!)
router.patch("/api/recipes/published", async (req, res) => {
    const { ...recipe } = req.body;  
    console.log("update to publish ",req.body)   
    
    if (!{...recipe}) {
        res.status(400).send({ message: "invalid recipe" })
    } else {
        await db.collection("users").updateOne(
            { email: req.session.user.email, 'recipes.procedure': req.body.procedure }, 
            { $set: { 'recipes.$.isPublished' : req.body.isPublished}}
        );
        res.status(200).send({ data: {...recipe} });
    }
});


export default router;