import dotenv from "dotenv";
dotenv.config();

import db from "./connectionAtlas.js";
import bcrypt from "bcrypt";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode" ) === -1 ? false : true;

if (isDeleteMode) {
    const collections = await db.listCollections().toArray();
    collections.forEach(collectionToDrop => {
        db.dropCollection(collectionToDrop.name); 
    });  
}

if (isDeleteMode) {
    const adminPlainPassword = process.env.ADMIN_PASSWORD;
    const bobPlainPassword = process.env.BOB_PASSWORD;
    const alicePlainPassword = process.env.ALICE_PASSWORD;

    const adminHashedPassword = await bcrypt.hash(adminPlainPassword, 12);
    const bobHashedPassword = await bcrypt.hash(bobPlainPassword, 12);
    const aliceHashedPassword = await bcrypt.hash(alicePlainPassword, 12);

    await db.collection("users").insertMany([
        { 
            username: "Admin", 
            email: "admin@mail.dk", 
            password: adminHashedPassword, 
            role_id: 1,
            picURL: "server/assets/default-profile-pic.png"
        }, 
        { 
            username: "Bob", 
            email: "bob@mail.dk", 
            password: bobHashedPassword, 
            role_id: 2,
            picURL: "server/assets/default-profile-pic.png",
            recipes: [
                { 
                    isPublic: true,
                    title: "Rucola pesto", 
                    category: "Italian", 
                    picURL: "https://www.valdemarsro.dk/wp-content/2018/01/rucolapesto.jpg", 
                    ingredients: "Rucola, pinjekerner, hvidløg, olivenolie, salt", 
                    procedure: "Op i en blender - hak, hak, hak.." 
                },
                { 
                    isPublic: true,
                    title: "Hot dog", 
                    category: "Nordic kitchen ", 
                    picURL: "https://helios-i.mashable.com/imagery/articles/001D2uXLBncMj8L2MxtRNd0/hero-image.fill.size_1200x900.v1611608312.jpg", 
                    ingredients: "Favorit pølsen, pølsebrød, dressing efter smag, syltede agurker, rå løg og syltede, sennep, kethup, lidt grønt hvis man er til det", 
                    procedure: "Byg den op som lego: først brød, så læg pølsen i revnen, smør den med valgt dressing og top af med topping" 
                },
                { 
                    isPublic: false,
                    title: "Svampe Bob firkant kage", 
                    category: "Baking", 
                    picURL: "https://chelsweets.com/wp-content/uploads/2019/07/sb-sliced--683x1024.jpg", 
                    ingredients: "Mel, sukker, smør, gul fondant, vaniljesukker, æg, mælk, krymmel", 
                    procedure: "Pisk mel, sukker og smør til en luftig masse og tilsæt resten." 
                }
            ] 
        },
        { 
            username: "Alice", 
            email: "alice@mail.dk", 
            password: aliceHashedPassword, 
            role_id: 2,
            picURL:"picture",
            recipes: [] 
        }
    ]);

    await db.collection("public_recipes").insertMany([
        { 
            isPublic: true,
            author: "bob@mail.dk", 
            title: "Rucola pesto", 
            category: "Italian", 
            picURL: "https://www.valdemarsro.dk/wp-content/2018/01/rucolapesto.jpg", 
            ingredients: "Rucola, pinjekerner, hvidløg, olivenolie, salt", 
            procedure: "Op i en blender - hak, hak, hak..",
        },
        { 
            isPublic: true,
            author: "bob@mail.dk", 
            title: "Hot dog", 
            category: "Nordic kitchen ", 
            picURL: "https://helios-i.mashable.com/imagery/articles/001D2uXLBncMj8L2MxtRNd0/hero-image.fill.size_1200x900.v1611608312.jpg", 
            ingredients: "Favorit pølsen, pølsebrød, dressing efter smag, syltede agurker, rå løg og syltede, sennep, kethup, lidt grønt hvis man er til det", 
            procedure: "Byg den op som lego: først brød, så læg pølsen i revnen, smør den med valgt dressing og top af med topping",
        }
        /*
        { 
            author: "", 
            title: "", 
            category: "", 
            picURL: "", 
            ingredients: "", 
            procedure: "", 
        },*/
    ]);


}
