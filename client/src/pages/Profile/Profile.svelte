<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user } from "../../stores/user.js";


    onMount(async () => {
        const recipesURL = null;
    });
    $: username = $user;
</script>

<h2>Profile</h2>
<h5>Welcome to your profile page <span class="user">{username}</span></h5>


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