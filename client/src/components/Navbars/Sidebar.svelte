<script>
    import { Link } from "svelte-navigator";
    import { user } from "../../stores/userGlobals";
    
</script>


{#if $user.role === 2} 
    <aside>
        <nav>
            <div>
                <Link to="/newsfeed">NEWSFEED</Link>
            </div>
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
                <Link to="/events">SEE EVENTS</Link>
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
                <Link to="/newsfeed">NEWSFEED</Link>
            </div>
            <div>
                <Link to="/approve-events">APPROVE EVENTS</Link>
            </div>
            <div>
                <Link to="/events">SEE EVENTS</Link>
            </div>
            <div>
                <Link to="/chat">LET'S TACO 'BOUT IT</Link>
            </div>
            <div>
                <Link to="/rating">RATINGS</Link>
            </div>
            <div>
                <Link to="/admin-feedback">RECIEVED FEEDBACK</Link>
            </div>
        </nav>
    </aside>
{:else}
    <aside></aside>
{/if}


<style>
    div {
        display: flex;
        justify-content: flex-start;
        margin-left: 15%;
        margin-bottom: 1em;
        text-align: left;
    }

    nav {
        position: fixed;
        overflow: hidden;
    }
</style>
