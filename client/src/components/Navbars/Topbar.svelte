<script>
    import "@picocss/pico";
    import { user } from "../../stores/user.js";
    import { Link } from "svelte-navigator";
    import Logout from "../Logout/Logout.svelte";

</script>

<nav class="grid">
    <div class="left">
        {#if $user}
            <Link to="/">
                <img src="../icons/home.png" alt="home icon in navbar">
            </Link>
            <p>User: {$user.username}</p>
        {:else}
            <Link to="/">
                <img src="../icons/home.png" alt="home icon in navbar">
            </Link>
        {/if}
    </div>
    <div class="middle">
        <h3><strong>My Food Universe</strong></h3>
    </div>
    <div class="right">
        {#if $user}
        <p><Logout/></p>
        {:else}
        <p><Link to="/login">Login</Link></p>
        {/if}
    </div>
</nav>


<style>
    .grid {
        padding: 2em 1em 0em 0em;
        border-bottom: 0.1em solid black;
        margin-bottom: 2em;
    }

    .left {
        grid-column: 1 span;
        display: flex;
        justify-content: space-around;
    }

    .middle { grid-column: 3 span; }

    .right { grid-column: 1 span; }

    img {
        height: 2em;
        width: 2em;
    }

    p { margin-top: 0.5em; }

    nav {
        position: fixed;
        overflow: hidden;
        width: 100%;
        background-color: #fff;
        top: 0;
        z-index: 999;
    }
</style>