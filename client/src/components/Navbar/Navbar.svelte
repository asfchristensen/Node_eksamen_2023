<script>
    import { user } from "../../stores/user.js";
    import { Link } from "svelte-navigator";
    import Logout from "../Logout/Logout.svelte";

    console.log($user)

</script>


<header>
    <div class="navbar">
        <div class="nav-link">
            <!-- admin = 1 -->
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
            <!-- user = 2 -->
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
                <Link to="/signup">Sign up</Link>
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
</style>