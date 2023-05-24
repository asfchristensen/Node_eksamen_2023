<script>
    import "@picocss/pico";
    import { Link } from "svelte-navigator";
    import { user } from "../../stores/user.js";

    console.log("User role: ", $user.role);

    
</script>


{#if $user.role === 2} 
    <aside>
        <nav>
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
        </nav>
    </aside>
{:else if $user.role === 1}
    <aside>
        <nav>
            <div>
                <Link to="/rating">RATINGS</Link>
            </div>
            <div>
                <Link to="/public-events">EVENTS</Link>
            </div>
            <div>
                <Link to="/newsfeed">NEWSFEED</Link>
            </div>
            <div>
                <Link to="/chat">LET'S TACO 'BOUT IT</Link>
            </div>
            <div>
                <Link to="/reports">REPORTS</Link>
            </div>
        </nav>
    </aside>
{:else}
    <aside>

    </aside>
{/if}



<style>
    div {
        display: flex;
        justify-content: flex-start;
        margin-left: 22%;
        margin-bottom: 1em;
    }

</style>
