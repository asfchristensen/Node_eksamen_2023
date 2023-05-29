<!--
<script>
    import { BASE_URL } from "../../stores/urlDomain.js"; 
    import { publicRecipes } from "../../stores/publicRecipes.js";
    import { user } from "../../stores/userGlobals.js";
    import { patch } from "../../api/api.js";
    
    export let object;

    let commentInput = "";

    async function handleCreateComment (object){
        const url = $BASE_URL + "/api/user/publicRecipes/comment";

        console.log("handle create recipe - comment ",recipe);
        console.log("rcomment to the recipe ", commentInput);

        const email = $user.email;
        const id = recipe._id;

        if (recipe.comments === undefined) {
            console.log("Inside if statement - create comment []");
            recipe.comments = [];
            console.log(recipe);
        }

       const commentToObject = { email, id, comment: commentInput };

        recipe.comments.push(commentToObject); 

        const commentToJSON = JSON.stringify(commentToObject);
        console.log("CommentToJSON ", commentToJSON);
        const response = await patch(url, commentToJSON);
    
        if (response.ok) { 
            const recipeComments = $publicRecipes.map((r) => {
            if (r.procedure === recipe.procedure) {
                console.log("Recipe changed to true", recipe);
                return recipe;
            }
            return r;
            });
            $publicRecipes = recipeComments;
        } else {
            console.log("Failed create a comment");
        }

        commentInput = "";
    }
</script>

<div>
    <textarea placeholder="Write comment"cols="30" rows="1" bind:value={commentInput}></textarea>
    <button on:click={handleCreateComment.bind(null, object)}>Add comment</button>
</div> 

-->