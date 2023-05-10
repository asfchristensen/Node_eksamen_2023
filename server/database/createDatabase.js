import db from "./connectionAtlas.js";
import bcrypt from "bcrypt";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode" ) === -1 ? false : true;

if (isDeleteMode) {
    const collections = await db.listCollections().toArray();
    collections.forEach(collectionToDrop => {
        db.dropCollection(collectionToDrop.name);
        db.createCollection("users");  
    }); 
}

if (isDeleteMode) {
    const adminPlainPassword = "admin123";
    const adminHashedPassword = await bcrypt.hash(adminPlainPassword, 12);

    const userPlainPassword = "user123";
    const userHashedPassword = await bcrypt.hash(userPlainPassword, 12);

    db.collection("users").insertMany([
        { username: "admin", email: "admin@mail.dk", password: adminHashedPassword, role_id: 1 }, 
        { username: "user", email: "user@mail.dk", password: userHashedPassword, role_id: 2 }
    ]);
}

// recipe
const recipeOne = { title: "pasta med hjemmelavet pesto", ingredients: "frisk pasta, din yndlings pesto"};
const recipetwo = { title: "sommer salat", ingredients: "grønt med grønt og en dress"};
const recipeThree = { title: "kylling med BBQ", ingredients: "en kyllling"};

db.collection("users").updateOne({email: "user@mail.dk"}, {$push: {recipes: { recipeOne, recipetwo } } } )