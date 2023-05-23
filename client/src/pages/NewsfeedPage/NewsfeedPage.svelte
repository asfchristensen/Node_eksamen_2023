<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js"; 
    import { publishedRecipes } from "../../stores/publishedRecipes.js";
    import { recipes, user } from "../../stores/user.js";
    import SearchBar from "../../components/SearchBar/SearchBar.svelte";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";

    // importer component med special navbar også .. 
    onMount(async () => {
        await handleGetPublishedRecipes();
    });

    async function handleGetPublishedRecipes() {
        const response = await fetch($BASE_URL + "/api/publishedRecipes");
        const result = await response.json();
        result.data.reverse();
        publishedRecipes.set(result.data); 
    } 

    function handleHasLikedButton(recipe) {
        console.log(recipe.likes);
        const isLiked = recipe.likes && recipe.likes.some(email => email === $user.email);
        console.log("isLiked: ", isLiked);
        return isLiked;
    }

    async function handleLike(recipe) {
        console.log("Recipe in handleLikeRecipe: ", recipe);
        
        // tjek om bruger med samme email har liket 
        const email = $user.email;
        const id = recipe._id;
        console.log("handleLike()",id);

        if (recipe.likes === undefined) {
            console.log("Inside if statement");
            recipe.likes = [];
            console.log(recipe);
        }
        
        recipe.likes.push(email); 

        const recipeLiked = JSON.stringify({ email, id });
        console.log("Recipe liked before patched: ", recipeLiked);
        const response = await fetch($BASE_URL + "/api/publishedRecipes/likes", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: recipeLiked,
            credentials: "include"
        }); 
    
        if (response.ok) { 
            const likedRecipes = $publishedRecipes.map((r) => {
            if (r.procedure === recipe.procedure) {
                console.log("Recipe liked", recipe);
                return recipe;
            }
            return r;
            });
            $publishedRecipes = likedRecipes;
        } else {
            console.log("Failed to like recipe");
        }
    }

    async function handleDislike(recipe) {
        console.log("Dislike function");
        const email = $user.email;
        const id = recipe._id;

        const updatedLikes = recipe.likes.filter(like => like !== email);
        console.log("updated like list:", updatedLikes);
        recipe.likes = updatedLikes;

        const recipeLiked = JSON.stringify({ email, id });
        console.log("Recipe liked before patched: ", recipeLiked);
        const response = await fetch($BASE_URL + "/api/publishedRecipes/dislike", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: recipeLiked,
            credentials: "include"
        }); 


        const updatePublishedRecipes = $publishedRecipes.map((r) => {
            if (r.procedure === recipe.procedure) {
                console.log("Likes updated - disliked", recipe);
                return recipe;
            }
            return r;
        });

        $publishedRecipes = updatePublishedRecipes;
    }

    /*
    let showComments = false;
    function handleToggleComments (){
       console.log("toggle", showComments);
       showComments = !showComments;
    } */

    let showComments = {};
    function handleToggleComments(recipe) {
        console.log("toggle", showComments[recipe._id]);
        showComments[recipe._id] = !showComments[recipe._id];
    }

    // Create function that saves the comment
    let commentInput = "";
    async function hanndleCreateComment (recipe){
        console.log("handle create recipe - comment ",recipe);
        console.log("rcomment to the recipe ", commentInput);

         //update store published recipe
        const email = $user.email;
        const id = recipe._id;

        if (recipe.comments === undefined) {
            console.log("Inside if statement - create comment []");
            recipe.comments = [];
            console.log(recipe);
        }

       const commentToObject = { email, id, comment: commentInput };

        recipe.comments.push(commentToObject); 

        //fecth
        const commentToJSON = JSON.stringify(commentToObject);
        console.log("CommentToJSON ", commentToJSON);
        const response = await fetch($BASE_URL + "/api/publishedRecipes/comment", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: commentToJSON,
            credentials: "include"
        }); 
    
        if (response.ok) { 
            const recipeComments = $publishedRecipes.map((r) => {
            if (r.procedure === recipe.procedure) {
                console.log("Recipe changed to true", recipe);
                return recipe;
            }
            return r;
            });
            $publishedRecipes = recipeComments;
        } else {
            console.log("Failed create a comment");
        }

        commentInput = "";
    }
    
</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>News Feed</h2>

        {#each $publishedRecipes as recipe}
            <p>{recipe.author}</p>
            <img src="{recipe.picURL}" alt="image of food"/>
            <p>{recipe.title}</p>
            <p>{recipe.procedure}</p><br>
            
            {#if handleHasLikedButton(recipe)}
                <button on:click={handleDislike.bind(null, recipe)} class="liked">Liked </button>
            {:else}
                <button on:click={handleLike.bind(null, recipe)}>Like recipe</button>
            {/if}
            <button on:click={handleToggleComments.bind(null, recipe)}>Comment</button>
            <div>
                {#if recipe.comments !== undefined && showComments[recipe._id]}
                    <div>
                        {#each recipe.comments as comment}                 
                            <div>
                                <p>From: {comment.email}</p>
                                <p>{comment.comment}</p>
                            </div>
                        {/each}
    
                        <div>
                            <textarea placeholder="write comment"cols="30" rows="1" bind:value={commentInput}></textarea>
                            <button on:click={hanndleCreateComment.bind(null, recipe)}>Add comment</button>
                        </div>
                    </div>
                {:else if recipe.comments === undefined && showComments[recipe._id]}
                    <div>
                        <textarea placeholder="write comment"cols="30" rows="1" bind:value={commentInput}></textarea>
                        <button on:click={hanndleCreateComment.bind(null, recipe)}>Add comment</button>
                    </div>
                {:else}
                    <div></div>
                {/if} 
            </div>
        {/each}
    </div>

    <div class="col-right">
        <SearchBar/>
    </div>
</div>

<style>
    .liked {
        background-color: green;
    }
</style>

