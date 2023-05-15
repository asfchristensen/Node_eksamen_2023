<script>
    import { publishedRecipes } from "../../stores/publishedRecipes.js";
    import { user } from "../../stores/user.js"

    const myLikes = $publishedRecipes.filter( recipe => recipe.likes && recipe.likes.includes($user.email));
        
 

</script>
<h1>My Likes</h1>

{#each myLikes as liked }
    <!-- Lav det i et card -->
    <img src="{liked.picURL}" alt="image of food"/>
    <p>{liked.title}</p>
    <p>{liked.author}</p>
{/each}