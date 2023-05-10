<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user, mail, recipes } from "../../stores/user.js";

    onMount(async () => {
        const recipesURL = $BASE_URL + `/api/recipes/${$mail}`;
        const response = await fetch(recipesURL);
        const result = await response.json();
        recipes.set(result.data); 
        console.log(typeof recipes);
    });

</script>

<h2>Profile</h2>
<h5>Welcome to your profile page <span class="user">{$user}</span></h5>


<div class="recipes">
    <h1>Her skal der være opskrifter</h1>
    {#each $recipes as recipe}
        <img src="{recipe.picURL}" alt="image of food"/>
        <p>{recipe.title}</p>
    {/each}
</div>

<!--
<div class="form-signup">
    <form on:submit|preventDefault={handleSignup}>
        <input type="text" placeholder="username" name="username" bind:value={username} required><br><br>

        <input type="password" placeholder="password" name="password" bind:value={password} required><br><br>

        <input type="email" placeholder="email" name="email" bind:value={email} required><br><br>

        <button type="submit">Sign up</button>
    </form>
</div>
-->

<style>
    .user {
        font-size: large;
        font-weight: bold;
        color: rgb(209, 76, 232);
    }
</style>