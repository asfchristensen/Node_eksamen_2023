<script>
    import { publishedRecipes } from "../../stores/publishedRecipes.js";

    const myLikes = $publishedRecipes.filter( recipe => recipe.likes && recipe.likes.includes('bob@mail.dk'));
        
 

</script>
