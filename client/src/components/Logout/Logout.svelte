<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user, recipes } from "../../stores/userGlobals.js";
    import { Link } from "svelte-navigator";
    import { get } from "../../api/api.js";
    import toastr from "toastr";
    
    async function handleLogout(){
        const url = $BASE_URL + "/api/all/auth/logout";
        const result = await get(url);

        $user = null;
        $recipes = null;

        if (result.status === 200) {
            toastr.info("See you!");
            localStorage.removeItem("user");
        } else {
            toastr.error("Failed to log out. Please try again later.");
        }
    }
</script>

<Link to="/" on:click={handleLogout}>Log out</Link>