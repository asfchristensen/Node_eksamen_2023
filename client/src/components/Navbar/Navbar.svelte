<script>
    import { user, role } from "../../stores/user.js";
    import { Link } from "svelte-navigator";

    import Logout from "../Logout/Logout.svelte";

    $: hasRole = $role;
    $: username = $user;
</script>


<header>
    <div class="navbar">
        <div class="nav-link">
            <!-- admin = 1 -->
            {#if hasRole === 1}
            <nav>
                <Link to="/profile">Profile</Link>
                <Logout/>
            </nav>
            <!-- user = 2 -->
            {:else if hasRole === 2}
            <nav>
                <Link to="/profile">Profile</Link>
                <Logout/>
            </nav>
            {:else}
                <Link to="/signup">Sign up</Link>
                <Link to="/profile">Profile</Link>
            {/if}
        </div>
        <div class="nav-user">
            {#if username}
            <p>Logged in as: <span class="username">{username}</span></p>
            {:else}
            <h3><span class="logo-text">The epic ice cream store</span></h3>
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
        font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; 
        color: rgb(250, 250, 199);
    }

    .username {
        font-weight: bold;
        color: rgb(209, 76, 232);
    }
</style>