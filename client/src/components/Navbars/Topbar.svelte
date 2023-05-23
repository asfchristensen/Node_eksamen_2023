<script>
    import "@picocss/pico";
    import { user } from "../../stores/user.js";
    import { Link } from "svelte-navigator";
    import Logout from "../Logout/Logout.svelte";

</script>

<nav class="grid">
    <div class="left">
        {#if $user}
            <Link to="/newsfeed">
                <img src="../icons/home.png" alt="home icon in navbar">
            </Link>
            <p>User: {$user.username}</p>
        {:else}
            <p><Link to="/frontpage">Frontpage</Link></p>
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
        padding: 1em 1em 0em 0em;
        border-bottom: 0.1em solid black;
    }

    .left {
        grid-column: 1 span;
        display: flex;
        justify-content: space-around;
    }

    .middle { grid-column: 3 span; }

    .right { 
        grid-column: 1 span; 
    }

    img {
        height: 2em;
        width: 2em;
    }

    p { margin-top: 0.5em; }
</style>

<!-- 
<header>
    <div class="navbar">
        <div class="nav-link">
            {#if $user}
            {#if $user.role === 1}
            <nav>
                <Link to="/admin">Read ratings</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/admin-event">Publish event(s)</Link>
                <Link to="/statistic">Stats</Link>
                <a href="/chat">Let's Taco 'Bout It</a>
                <Logout/>
            </nav>
            {:else if $user.role === 2}
            <nav>
                <Link to="/profile">Profile</Link>
                <Link to="/newsFeed">News feed</Link>
                <a href="/chat">Let's Taco 'Bout It</a>
                <Logout/>
            </nav>
            {/if}
            {/if}
            {#if !$user}
                <Link to="/maps">Google MAPS</Link> 
                <Link to="/login">Log in</Link>
                <Link to="/home">Home</Link>
            {/if}
        </div>
        <div class="nav-user">
            {#if $user}
            {#if $user.username}
            <p>Logged in as: <span class="username">{$user.username}</span></p>
            {:else}
            <h3><span class="logo-text">The epic ice cream store</span></h3>
            {/if}
            {/if}
        </div>
    </div>
</header>


<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        background-color: rgb(194, 230, 243);
        height: auto;
        padding-top: 1em; 
        padding-bottom: 1em;
        margin-bottom: 3em;
    }

    .nav-link {
        display: flex;
        align-items: center;
        width: 40em;
        border-radius: 1em;
        margin-left: 2em;
        padding: 1em;
    }

    .nav-user {
        margin-right: 2em;
    }

    .logo-text {
        font-family:Impact, 'Arial Narrow Bold', sans-serif; 
        color: rgb(250, 250, 199);
    }

    .username {
        font-weight: bold;
        color: rgb(209, 76, 232);
    }
</style> -->