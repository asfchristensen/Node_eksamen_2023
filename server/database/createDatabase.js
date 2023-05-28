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
    const stanPlainPassword = process.env.STAN_PASSWORD;

    const adminHashedPassword = await bcrypt.hash(adminPlainPassword, 12);
    const bobHashedPassword = await bcrypt.hash(bobPlainPassword, 12);
    const aliceHashedPassword = await bcrypt.hash(alicePlainPassword, 12);
    const stanHashedPassword = await bcrypt.hash(stanPlainPassword, 12);

    await db.collection("users").insertMany([
        { 
            username: "Admin", 
            email: "admin@mail.dk", 
            password: adminHashedPassword, 
            role_id: 1,
        }, 
        { 
            username: "Bob", 
            email: "bob@mail.dk", 
            password: bobHashedPassword, 
            role_id: 2,
            profilePicture: "../profilePictures/default.png",
            memberSince: 2023,
            recipes: [
                { 
                    isPublic: false,
                    title: "Strawberry Arugula Salad", 
                    category: "Appetizer", 
                    picURL: "https://minimalistbaker.com/wp-content/uploads/2015/07/Strawberry-Arugula-Salad-with-Hemp-Seeds-and-Brown-Sugar-Pecans-Healthy-quick-and-satisfying-recipe-salad-strawberry-healthy-vegan-summer.jpg", 
                    ingredients: 
                        "1/2 cup raw pecan halves, " + 
                        "1 1/2 Tbsp coconut oil, " +
                        "1 pinch each sea salt, ground cinnamon and cayenne pepper, " + 
                        "2 medium shallots, " + 
                        "1/3 cup balsamic vinegar, " + 
                        "1-2 Tbsp maple syrup, " +
                        "1 1/2 cups hulled quartered strawberries, " + 
                        "7 ounces arugula, ",
                    procedure: 
                        "Preheat oven to 350 degrees F (176 C) and place pecans on a foil- or parchment-lined baking sheet. Roast for 8 minutes. " +
                        "In the meantime, add coconut oil, coconut sugar, sea salt, cinnamon and cayenne pepper to a small mixing bowl and whisk to combine. " +
                        "Add shallot to blender or food processor with balsamic vinegar, remaining olive oil (2 Tbsp as original recipe is written), maple syrup and a pinch each salt and pepper. Blend until completely pureed. Taste and adjust seasonings as needed. " + 
                        "Add arugula, hemp seeds, strawberries and most of the roasted pecans to a large mixing bowl and top with 2-3 Tbsp dressing (as original recipe is written // adjust if altering batch size). Gently toss to combine. " + 
                        "Plate salad and garnish with remaining pecans. Serve additional dressing on the side. Serves 2 as an entrée or 4 as a side dish. Best when fresh.", 
                    serves: "4 persons",
                    isDeleted: false 
                },
                { 
                    isPublic: false,
                    title: "SpongeBob Cake", 
                    category: "Baking", 
                    picURL: "https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00209328000000/d5b5eccb7aa838c53cac9188469d8454_large.png&width=512&type=webp&quality=90", 
                    ingredients: 
                        "2 quantities of the red velvet cake baked in two trays 1.5cm (0.59 inches) deep x 38cm (14.96 inches) long and 25cm (9.84 inches) wide, " +
                        "A piece of paper 17.7cm (6.97 inches) x 7.8cm (3.07 inches) to use as a template for cutting your cake. " +
                        "1 quantity of cream cheese frosting, " + 
                        "2 quantities of buttercream frosting, " +
                        "FONDANT: " +
                        "yellow 1kg (2.2 pounds). I had approximately 300g (10.58 ounces) left over but you will need the extra to roll and drape over the cake. " +
                        "50g (1.76 ounces) black, " +
                        "brown 150g (5.29 ounces), " +
                        "white 300g (10.58 ounces), " +
                        "red 50g (1.76 ounces), " +
                        "blue 50g (1.76 ounces).", 
                    procedure: 
                        "You basically need to blend all the ingredients together to a nice thick mass. When that is done, move on to the fondant and be creative.",
                    serves: "12 persons",
                    isDeleted: false
                },
                {
                    isPublic: false,
                    title: "Jalapeno's Ice Cream", 
                    category: "Sweets", 
                    picURL: "https://assets.listia.com/photos/b115f11e29249bd42196/original.jpg?s=800x600g&sig=782a27ffaba7f82a&ts=1378055520", 
                    ingredients: 
                        "1 (15 ounce) can fruit cocktail, drained well (I use Libby's cherry cherry cherry in light syrup), " +
                        "1 -2 jalapeno, seeded and diced small, " +
                        "2 tablespoons tequila, " +
                        "1 1⁄2 cups heavy cream, " +
                        "1⁄2 cup Splenda sugar substitute (or sugar), " +
                        "1 teaspoon vanilla extract.", 
                    procedure: 
                        "CLASSIC ICE CREAM: To the fruit cocktail, add jalapenos and tequila. Mix well, cover, and refrigerate. " +
                        "Mix the half and half with the sugar and vanilla. " + 
                        "Stir until sugar is dissolve. " + 
                        "Place milk/sugar mixture into machine and churn for 15-20 minutes. " +
                        "Add fruit mixture and continue churning until ice cream is formed (about 5 minutes). " +
                        "Scoop into a freezer safe container with lid, cover and freeze for at least 2 hours. " +
                        "CUSTARD ICE CREAM: Combine the heavy cream, tequila, and chopped jalapenos in a saucepan and place over medium heat. " + 
                        "Bring to a simmer, and cook gently about 10-12 minutes, then remove from the heat. " +
                        "Watch carefully so it does not boil. " +
                        "Meanwhile, in a bowl, whisk the sugar and vanilla into the egg yolks until slightly pale and lightened. " +
                        "Pour about 1/3 of the cream mixture into the yolks while whisking vigorously. " +
                        "Add the yolk mixture back into the saucepan with the rest of the cream mixture and cook over medium heat stirring constantly until the mixture thickens sufficiently to coat the back of spoon. " + 
                        "DO NOT allow the custard to boil. " +
                        "Remove from the heat and place in the refrigerator to cool for at least 2 hours. " + 
                        "When it has cooled, place in an ice cream maker and churn for 15-20 minutes. " + 
                        "Add in the well drained fruit cocktail and churn an additional 5 minutes. " +
                        "Place into a freezer safe container, cover and chill at least 2 hours. " + 
                        "ICE CREAM BALLS: Scoop about 1/4 cup of ice cream and quickly form it into a ball. " +
                        "Roll in cinnamon sugar, then in crushed cereal, place on cookie sheet and keep frozen. " + 
                        "When ready to serve, serve as is, or deep fry for 2-3 seconds then drain on paper towels for a few seconds. Serve in a shallow bowl drizzled with chocolate and caramel toppings.",
                    serves: "8 persons",  
                    isDeleted: false
                },
                { 
                    isPublic: true,
                    title: "Green Dog", 
                    category: "Lunch", 
                    picURL: "https://static.dezeen.com/uploads/2018/03/space-10-design_dezeen_2364_col_4.jpg", 
                    ingredients: 
                        "2 packs Garden Gourmet Sensational Sausage, " +
                        "100 g very thinly sliced red cabbage (pre-cut), " +
                        "1 large avocado, " +
                        "1/2 pineapple, " +
                        "1 head of green salad (lollo verde), " +
                        "1 lime, " +
                        "1 tbsp vegan mayonnaise, " +
                        "Sweet chili sauce, " +
                        "Bunch of fresh coriander, " +
                        "4 vegan green hot dog buns.", 
                    procedure: 
                        "This i delicate, so build it carefully! Just talking som personal expirence. So you need to: " +
                        "1. PREPARE THE VEGGIES: " +
                        "Halve the avocado, peel and skin and scoop out the flesh, cut into slices and sprinkle with lime. " +
                        " 2. GRILL THE SENSATIONAL SAUSAGES AND PINEAPPLE: " +
                        "Grill the Sensational sausages and pineapple in a grill pan or BBQ, see instructions on the package. " +
                        "3. FILL THE BUNS WITH TOPPINGS: " +
                        "Cut the buns legendaryly open and lightly coat them with the vegan mayonnaise. " +
                        "Cover with lettuce leaves, avocado slices, grilled pineapple pieces and red cabbage." + 
                        "4. PLACE THE SAUSAGE, GARNISH, AND SERVE!" +
                        "Place a grilled Sensational sausage on top and garnish with sweet chili sauce and coriander.",
                    serves: "6 persons",
                    isDeleted: false 
                },
                {
                    isPublic: true,
                    title: "Blue Burger", 
                    category: "Dinner", 
                    picURL: "https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/full_blue_burger.jpg?itok=kjFiYdxF", 
                    ingredients: 
                        "1 lb lean ground sirloin, salt, fresh ground black pepper, " +
                        "1 red bell pepper, stemmed, seeded and quartered, " +
                        "1 teaspoon olive oil, " +
                        "4 hamburger buns, " +
                        "1 large sweet white onion (Vidalia or Walla Walla), " +
                        "2 tablespoons crumbled blue cheese " +
                        "1 injection of blue color (into the buns)", 
                    procedure: 
                        "Preheat grill to medium-high heat. " +
                        "Using your hands, lightly shape the ground sirloin into four 1/2-inch thick patties. " + 
                        "Try to leave some air in the burger and avoid packing them too densely. " +
                        "Season with salt and pepper. " +
                        "Lightly drizzle the red pepper quarters with olive oil. " +
                        "Cook the burgers on both sides over the hot grill for about 5 to 6 minutes per side for medium burgers. " +
                        "At the same time, grill the peppers for 2 to 3 minutes on each side. " +
                        "Lightly toast the buns on the grill. " +
                        "Serve the burgers on toasted buns with grilled red peppers, slices of sweet white onion and crumbled blue cheese.",
                    serves: "4 persons",  
                    isDeleted: false
                },
                {
                    isPublic: true,
                    title: "Afternoon Milkshake", 
                    category: "Sweets", 
                    picURL: "https://i.pinimg.com/736x/bc/d7/ae/bcd7ae536e8382e25d1254a1b3be3d7c.jpg", 
                    ingredients: 
                        "Froot Loops. " + 
                        "Milk and Light Brown Sugar: These are used to make the infused milk that gets mixed into the pancake batter. " + 
                        "You can use a dairy free milk if you like, and dark brown sugar can be substituted for the light brown sugar. " +
                        "The Pancake Base: Your basics here! Flour, baking powder, salt, vanilla, egg, and salted butter.", 
                    procedure: 
                        "Toast 1 cup of the Froot Loops on a baking sheet at 300ºF for 15 minutes. Let cool completely." +
                        "In a large measuring cup, combine the toasted Froot Loops, milk, and light brown sugar, and steep for 20 minutes, stirring every 5 minutes. " +
                        "Strain the milk into a microwave safe dish. " +
                        "Warm the milk for 30 seconds in the microwave. You will melt your butter and add it into this warm milk. " +
                        "Sift the flour, baking powder, and salt together twice. Make a small well in the center of the flour mixture and pour in the milk, beaten egg, and vanilla. " +
                        "Mix just until combined and let the batter rest. This is the perfect time to preheat your griddle!" + 
                        "Carefully scoop scant ¼ cup portions of batter onto the griddle. " +
                        "Flip after 2 to 3 minutes or until the pancake is golden brown on bottom and bubbly on top. Flip and repeat. " +
                        "Remove from the griddle and serve with butter, syrup, whipped cream, and more Froot Loops. " +
                        "Mix milk and flavors and place the pancakes on top of the milkshake and serve! Bon Appetit!",
                    serves: "1 person",  
                    isDeleted: false
                },
            ] 
        },
        { 
            username: "Alice", 
            email: "alice@mail.dk", 
            password: aliceHashedPassword, 
            role_id: 2,
            profilePicture: "../profilePictures/default.png",
            memberSince: 2023,
            recipes: [] 
        },
        {
            username: "Stan",
            email: "stan@mail.dk",
            password: stanHashedPassword,
            role_id: 2,
            profilePicture: "../profilePictures/default.png",
            memberSince: 2023,
            recipes: [
                {
                    isPublic: false,
                    title: "Watergate Salad", 
                    category: "Sweets", 
                    picURL: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/48/20/7/NiYX5VYQ9GdKZrvCZZf9_IMG_8246.jpg", 
                    ingredients: 
                        "1 (3 1/2 ounce) package instant pistachio pudding mix, " +
                        "1 (20 ounce) can crushed pineapple with juice, undrained, " +
                        "1 cup miniature marshmallow, " +
                        "1/2 cup chopped nuts, " +
                        "2 cups thawed non-dairy whipped topping.", 
                    procedure: 
                        "STIR pudding mix, pineapple with juice, marshmallows and nuts in large bowl until well blended. " +
                        "GENTLY stir in whipped topping. " +
                        "REFRIGERATE 1 hour or until ready to serve. " +
                        "Garnish as desired.",
                    serves: "8 persons",  
                    isDeleted: false
                },
                {
                    isPublic: false,
                    title: "Tomato Aspic", 
                    category: "Dinner", 
                    picURL: "https://cf-images.us-east-1.prod.boltdns.net/v1/static/474428695/f2e658aa-eebb-4d3d-a510-edc2339a77ce/69b3fc9b-d9f6-49cf-963a-5605988bf6e4/1920x1080/match/image.jpg", 
                    ingredients: 
                        "2 tablespoons unflavored gelatin, " +
                        "1/4 cup cold water, " +
                        "1/4 cup boiling water, " +                        
                        "4 cups tomato juice, " +                        
                        "1 tablespoon onion, minced, " +                        
                        "1 teaspoon sugar, " +                        
                        "1 teaspoon table salt, " +                        
                        "1 teaspoon seasoned salt, " +                        
                        "1 teaspoon Worcestershire sauce, " +                       
                        "1/2 teaspoon celery seeds, " +                       
                        "2 bay leaves, " +                        
                        "2 whole cloves, " +                        
                        "2 tablespoons fresh lemon juice, " +                        
                        "Fresh parsley, for garnish", 
                    procedure: 
                        "Sprinkle the gelatin over the cold water in a bowl. " + 
                        "Let stand 5 minutes. " + 
                        "Whisk in the boiling water until the gelatin is dissolved. " +
                        "Stir together the tomato juice and next 8 ingredients in a large saucepan. " + 
                        "Bring to a boil over medium-high. " + 
                        "Reduce heat, and simmer, stirring occasionally, 15 minutes. " +
                        "Pour through a wire-mesh strainer into a bowl. " + 
                        "Stir in the lemon juice and gelatin. " +
                        "Pour into a 10-inch ring mold coated with cooking spray or 6 individual molds. " + 
                        "cCill 6 hours or until set.",
                    serves: "8-10 persons",  
                    isDeleted: false
                },
                {
                    isPublic: true,
                    title: "Fried Cool-Aid", 
                    category: "Breakfast", 
                    picURL: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/45/92/70/picDhUJGc.jpg", 
                    ingredients: 
                        "vegetable oil (for frying), " +
                        "1⁄4 cup sweetened Kool-Aid drink mix, " +
                        "3 eggs, " +
                        "1⁄4 sugar, " +
                        "1⁄2 teaspoon salt, " +
                        "2 teaspoons baking powder, " +
                        "2 cups milk, " +
                        "3 2⁄3 cups flour.", 
                    procedure: 
                        "Make the batter by beating the eggs and sugar together. " +
                        "Gradually add the milk and dry ingredients. " +
                        "Preheat oil to 350°F. " +
                        "Cook in hot vegetable oil until golden brown (a few minutes, depending on heat). " +
                        "Cool on paper-towel covered tray for a few minutes, then dig in!",
                    serves: "6-8 persons",  
                    isDeleted: false
                },
                {
                    isPublic: true,
                    title: "Deep Fried Mars Bars", 
                    category: "Sweets", 
                    picURL: "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/43/46/3/8RvPP9HHTO2QVcz1AnLC_food-2016-05-047143.jpg", 
                    ingredients: 
                        "1 Mars bars, " +
                        "1 cup plain flour, " +
                        "1⁄2 cup cornflour, " +
                        "1 pinch baking soda, " +
                        "milk or beer, " +
                        "oil (for deep frying)", 
                    procedure: 
                        "Chill the chocolate bar by keeping it in the fridge, but don't freeze it. " +
                        "Mix the flours and bicarbonate of soda (baking soda) together. " +
                        "Add milk (traditional) or beer (which gives a lighter result) until you get a batter with the consistency of thin cream. " +
                        "Heat the oil until a small piece of bread will brown in a few seconds, but don't allow to smoke. " +
                        "Remove wrapper from chilled chocolate bar. " +
                        "Coat completely in batter. " +
                        "Carefully lower into hot oil and fry until golden brown. " +
                        "Serve, with ice cream or french fries, if you're so inclined.",
                    serves: "1 person",  
                    isDeleted: false
                }
            ]
        }
    ]);

    await db.collection("public_recipes").insertMany([
        {
            isPublic: true,
            title: "Blue Burger", 
            category: "Dinner", 
            picURL: "https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/full_blue_burger.jpg?itok=kjFiYdxF", 
            ingredients: 
                "1 lb lean ground sirloin, salt, fresh ground black pepper, " +
                "1 red bell pepper, stemmed, seeded and quartered, " +
                "1 teaspoon olive oil, " +
                "4 hamburger buns, " +
                "1 large sweet white onion (Vidalia or Walla Walla), " +
                "2 tablespoons crumbled blue cheese " +
                "1 injection of blue color (into the buns)", 
            procedure: 
                "Preheat grill to medium-high heat. " +
                "Using your hands, lightly shape the ground sirloin into four 1/2-inch thick patties. " + 
                "Try to leave some air in the burger and avoid packing them too densely. " +
                "Season with salt and pepper. " +
                "Lightly drizzle the red pepper quarters with olive oil. " +
                "Cook the burgers on both sides over the hot grill for about 5 to 6 minutes per side for medium burgers. " +
                "At the same time, grill the peppers for 2 to 3 minutes on each side. " +
                "Lightly toast the buns on the grill. " +
                "Serve the burgers on toasted buns with grilled red peppers, slices of sweet white onion and crumbled blue cheese.",
            serves: "4 persons",  
            isDeleted: false
        },
        {
            isPublic: true,
            title: "Afternoon Milkshake", 
            category: "Sweets", 
            picURL: "https://i.pinimg.com/736x/bc/d7/ae/bcd7ae536e8382e25d1254a1b3be3d7c.jpg", 
            ingredients: 
                "Froot Loops. " + 
                "Milk and Light Brown Sugar: These are used to make the infused milk that gets mixed into the pancake batter. " + 
                "You can use a dairy free milk if you like, and dark brown sugar can be substituted for the light brown sugar. " +
                "The Pancake Base: Your basics here! Flour, baking powder, salt, vanilla, egg, and salted butter.", 
            procedure: 
                "Toast 1 cup of the Froot Loops on a baking sheet at 300ºF for 15 minutes. Let cool completely." +
                "In a large measuring cup, combine the toasted Froot Loops, milk, and light brown sugar, and steep for 20 minutes, stirring every 5 minutes. " +
                "Strain the milk into a microwave safe dish. " +
                "Warm the milk for 30 seconds in the microwave. You will melt your butter and add it into this warm milk. " +
                "Sift the flour, baking powder, and salt together twice. Make a small well in the center of the flour mixture and pour in the milk, beaten egg, and vanilla. " +
                "Mix just until combined and let the batter rest. This is the perfect time to preheat your griddle!" + 
                "Carefully scoop scant ¼ cup portions of batter onto the griddle. " +
                "Flip after 2 to 3 minutes or until the pancake is golden brown on bottom and bubbly on top. Flip and repeat. " +
                "Remove from the griddle and serve with butter, syrup, whipped cream, and more Froot Loops. " +
                "Mix milk and flavors and place the pancakes on top of the milkshake and serve! Bon Appetit!",
            serves: "1 person",  
            isDeleted: false
        },
        {
            isPublic: true,
            title: "Fried Cool-Aid", 
            category: "Breakfast", 
            picURL: "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/45/92/70/picDhUJGc.jpg", 
            ingredients: 
                "vegetable oil (for frying), " +
                "1⁄4 cup sweetened Kool-Aid drink mix, " +
                "3 eggs, " +
                "1⁄4 sugar, " +
                "1⁄2 teaspoon salt, " +
                "2 teaspoons baking powder, " +
                "2 cups milk, " +
                "3 2⁄3 cups flour.", 
            procedure: 
                "Make the batter by beating the eggs and sugar together. " +
                "Gradually add the milk and dry ingredients. " +
                "Preheat oil to 350°F. " +
                "Cook in hot vegetable oil until golden brown (a few minutes, depending on heat). " +
                "Cool on paper-towel covered tray for a few minutes, then dig in!",
            serves: "6-8 persons",  
            isDeleted: false
        },
        { 
            isPublic: true,
            title: "Green Dog", 
            category: "Lunch", 
            picURL: "https://static.dezeen.com/uploads/2018/03/space-10-design_dezeen_2364_col_4.jpg", 
            ingredients: 
                "2 packs Garden Gourmet Sensational Sausage, " +
                "100 g very thinly sliced red cabbage (pre-cut), " +
                "1 large avocado, " +
                "1/2 pineapple, " +
                "1 head of green salad (lollo verde), " +
                "1 lime, " +
                "1 tbsp vegan mayonnaise, " +
                "Sweet chili sauce, " +
                "Bunch of fresh coriander, " +
                "4 vegan green hot dog buns.", 
            procedure: 
                "This i delicate, so build it carefully! Just talking som personal expirence. So you need to: " +
                "1. PREPARE THE VEGGIES: " +
                "Halve the avocado, peel and skin and scoop out the flesh, cut into slices and sprinkle with lime. " +
                " 2. GRILL THE SENSATIONAL SAUSAGES AND PINEAPPLE: " +
                "Grill the Sensational sausages and pineapple in a grill pan or BBQ, see instructions on the package. " +
                "3. FILL THE BUNS WITH TOPPINGS: " +
                "Cut the buns legendaryly open and lightly coat them with the vegan mayonnaise. " +
                "Cover with lettuce leaves, avocado slices, grilled pineapple pieces and red cabbage." + 
                "4. PLACE THE SAUSAGE, GARNISH, AND SERVE!" +
                "Place a grilled Sensational sausage on top and garnish with sweet chili sauce and coriander.",
            serves: "6 persons",
            isDeleted: false 
        }, 
        {
            isPublic: true,
            title: "Deep Fried Mars Bars", 
            category: "Sweets", 
            picURL: "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/43/46/3/8RvPP9HHTO2QVcz1AnLC_food-2016-05-047143.jpg", 
            ingredients: 
                "1 Mars bars, " +
                "1 cup plain flour, " +
                "1⁄2 cup cornflour, " +
                "1 pinch baking soda, " +
                "milk or beer, " +
                "oil (for deep frying)", 
            procedure: 
                "Chill the chocolate bar by keeping it in the fridge, but don't freeze it. " +
                "Mix the flours and bicarbonate of soda (baking soda) together. " +
                "Add milk (traditional) or beer (which gives a lighter result) until you get a batter with the consistency of thin cream. " +
                "Heat the oil until a small piece of bread will brown in a few seconds, but don't allow to smoke. " +
                "Remove wrapper from chilled chocolate bar. " +
                "Coat completely in batter. " +
                "Carefully lower into hot oil and fry until golden brown. " +
                "Serve, with ice cream or french fries, if you're so inclined.",
            serves: "1 person",  
            isDeleted: false
        }, 
    ]);

    await db.collection("events").insertMany([
        {
            isPublic: true,
            eventName: "Dog Birthday with space theme and inspiring dog-food recipes",
            category: "Dogs and owners",
            date: "2023-07-20",
            startTime: "12:00",
            endTime: "17:00",
            picURL: "https://i.pinimg.com/originals/1b/4e/ba/1b4eba5d4c713d64b59ccadc36c8e34f.jpg",
            address: "Damhusengen, 2720 Vanløse",
            isDeleted: false
        },
        {
            isPublic: true,
            eventName: "Tapas night for all in the universe",
            category: "Resturant dinner",
            date: "2023-11-11",
            startTime: "19:00",
            endTime: "23:30",
            picURL: "https://d32dbz94xv1iru.cloudfront.net/resize/1/images/events/by_uuid/a3/a3629a9e-fa9a-478e-bcfd-3cd0feb43b94-1500x900.jpg",
            address: "Skindergade 36 Basement, København 1159 Danmark",
            isDeleted: false
        },
        {
            isPublic: false,
            eventName: "Summer market",
            category: "Fun and joy",
            date: "2023-06-30",
            startTime: "16:00",
            endTime: "20:00",
            picURL: "https://i0.wp.com/www.afrenchcollection.com/wp-content/uploads/2016/09/Market-place-scene.jpg?ssl=1",
            address: "Pile Allé 55, 2000 Frederiksberg",
            isDeleted: false 
        },
        {
            isPublic: false,
            eventName: "Cooking Course",
            category: "Learning and exploring",
            date: "2023-12-12",
            startTime: "15:00",
            endTime: "17:00",
            picURL: "https://media.timeout.com/images/105170664/750/422/image.jpg",
            address: "Nørrebros Runddel St. (Nørrebrogade)",
            isDeleted: false
        }

    ]);

    await db.collection("ratings").insertMany([
        {
            isPublic: false,
            rating: 1,
            comment: "I can't stand the fact that the response time is soooo slow! Seriously?",
            username: "Bob",
            isDeleted: false
        },
        {
            isPublic: false,
            rating: 5,
            comment: "Can I just say yet again, how OUTSTANDING this app is! Truly appreciate it!",
            username: "Stan",
            isDeleted: false
        },
        {
            isPublic: true,
            rating: 3,
            comment: "The app is good, although I think the colors are a bit too much for my taste. I know it's weird, but can you change them?",
            username: "Alice",
            isDeleted: false
        },
        {
            isPublic: true,
            rating: 5,
            comment: "Outstanding app! I can have all my favorite recipes in one place ´, and get inspired everyday by food-enthusiasts!",
            username: "Stan",
            isDeleted: false
        },
        {
            isPublic: true,
            rating: 4,
            comment: "Love the app. The people are sweet, and it's a universe to be a part of.",
            username: "Bob",
            isDeleted: false
        }
    ]);

    await db.collection("feedback").insertMany([
        {
            isAnswered: false,
            subject: "Delete my post in newsfeed",
            feedback: "Hi admin, can you please delete my post 'Deep Fried Mars Bars'? I heard they are bad for you, and I don't want people to get sick. Thanks!",
            username: "Stan",
            userEmail: "stan@mail.dk",
            isDeleted: false,
        },
        {
            isAnswered: false,
            subject: "Can't edit my profile",
            feedback: "I have problems editing my profile page. What should I do, if I want to change my profile picture? Regards Alice",
            username: "Alice",
            userEmail: "alice@mail.dk",
            isDeleted: false,
        }
    ]);
}
