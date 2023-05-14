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
    const adminPlainPassword = "admin123";
    const adminHashedPassword = await bcrypt.hash(adminPlainPassword, 12);

    const bobPlainPassword = "bob123";
    const bobHashedPassword = await bcrypt.hash(bobPlainPassword, 12);

    const alicePlainPassword = "alice123";
    const aliceHashedPassword = await bcrypt.hash(alicePlainPassword, 12);

    await db.collection("users").insertMany([
        { 
            username: "admin", 
            email: "admin@mail.dk", 
            password: adminHashedPassword, 
            role_id: 1,
        }, 
        { 
            username: "Bob", 
            email: "bob@mail.dk", 
            password: bobHashedPassword, 
            role_id: 2,
            recipes: [
                { 
                    isPublished: true,
                    title: "Rucola pesto", 
                    category: "Italian", 
                    picURL: "https://www.valdemarsro.dk/wp-content/2018/01/rucolapesto.jpg", 
                    ingredients: "Rucola, pinjekerner, hvidløg, olivenolie, salt", 
                    procedure: "Op i en blender - hak, hak, hak.." 
                },
                { 
                    isPublished: true,
                    title: "Hot dog", 
                    category: "Nordic kitchen ", 
                    picURL: "https://helios-i.mashable.com/imagery/articles/001D2uXLBncMj8L2MxtRNd0/hero-image.fill.size_1200x900.v1611608312.jpg", 
                    ingredients: "Favorit pølsen, pølsebrød, dressing efter smag, syltede agurker, rå løg og syltede, sennep, kethup, lidt grønt hvis man er til det", 
                    procedure: "Byg den op som lego: først brød, så læg pølsen i revnen, smør den med valgt dressing og top af med topping" 
                },
                { 
                    isPublished: false,
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
            recipes: [] 
        }
    ]);

    await db.collection("published_recipes").insertMany([
        { 
            author: "bob@mail.dk", 
            title: "Rucola pesto", 
            category: "Italian", 
            picURL: "https://www.valdemarsro.dk/wp-content/2018/01/rucolapesto.jpg", 
            ingredients: "Rucola, pinjekerner, hvidløg, olivenolie, salt", 
            procedure: "Op i en blender - hak, hak, hak..",
            likes: [] 
        },
        { 
            author: "bob@mail.dk", 
            title: "Hot dog", 
            category: "Nordic kitchen ", 
            picURL: "https://helios-i.mashable.com/imagery/articles/001D2uXLBncMj8L2MxtRNd0/hero-image.fill.size_1200x900.v1611608312.jpg", 
            ingredients: "Favorit pølsen, pølsebrød, dressing efter smag, syltede agurker, rå løg og syltede, sennep, kethup, lidt grønt hvis man er til det", 
            procedure: "Byg den op som lego: først brød, så læg pølsen i revnen, smør den med valgt dressing og top af med topping",
            likes: [] 
        }
        /*
        { 
            author: "", 
            title: "", 
            category: "", 
            picURL: "", 
            ingredients: "", 
            procedure: "", 
            likes: [] 
        },
        { 
            author: "", 
            title: "", 
            category: "", 
            picURL: "", 
            ingredients: "", 
            procedure: "", 
            likes: [] 
        },*/
    ]);
}

// recipe
const recipeOne = { title: "pasta med hjemmelavet pesto", ingredients: "frisk pasta, din yndlings pesto"};
const recipetwo = { title: "sommer salat", ingredients: "grønt med grønt og en dress"};
const recipeThree = { title: "kylling med BBQ", ingredients: "en kyllling"};

db.collection("users").updateOne({email: "user@mail.dk"}, {$push: {recipes: { recipeOne, recipetwo } } } )