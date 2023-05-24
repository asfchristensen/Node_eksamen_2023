<script>
    import "@picocss/pico";
    import { Link } from "svelte-navigator";
    import { user } from "../../stores/user.js";
    
</script>


<aside>
    <nav>
        {#if $user.role === 2} 
            <div>
                <Link to="/profile">PROFILE</Link>
            </div>
            <div>
                <Link to="/settings">SETTINGS</Link>
            </div>
            <div>
                <Link to="/chat">LET'S TACO 'BOUT IT</Link>
            </div>
            <div>
                <Link to="/events">EVENTS</Link>
            </div>
            <div>
                <Link to="/feedback">FEEDBACK</Link>
            </div>
        {:else}
            <div>
                <Link to="/rating">PUBLISH RATINGS</Link>
            </div>
            <div>
                <Link to="/publish-events">PUBLISH EVENTS</Link>
            </div>
            <div>
                <Link to="/newsfeed">NEWSFEED</Link>
            </div>
            <div>
                <Link to="/chat">LET'S TACO 'BOUT IT</Link>
            </div>
            <div>
                <Link to="/rapports">RAPPORTS</Link>
            </div>
        {/if}
    </nav>
</aside>


<style>
    div {
        display: flex;
        justify-content: flex-start;
        margin-left: 22%;
        margin-bottom: 1em;
    }

</style>
