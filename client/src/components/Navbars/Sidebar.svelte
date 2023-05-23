<script>
    import "@picocss/pico";
    import { Link } from "svelte-navigator";
    
</script>

<aside>
    <nav>
        <div>
            <Link to="/profile">Profile</Link>
        </div>
        <div>
            <Link to="/settings">Settings</Link>
        </div>
        <div>
            <Link to="/chat">Let's Taco 'Bout it</Link>
        </div>
        <div>
            <Link to="/events">Events</Link>
        </div>
        <div>
            <Link to="/feedback">Feedback</Link>
        </div>
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
