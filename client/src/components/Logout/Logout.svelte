<script>
    import { BASE_URL } from "../../stores/urlDomain";
    import { user, recipes } from "../../stores/user.js";
    import { Link } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    
    async function handleLogout(){
        const logoutURL = $BASE_URL + "/api/auth/logout";

        const response = await fetch(logoutURL, {
            credentials: "include"
        });

        const data = await response.json();

        $user = null;
        $recipes = null;

        if (data.message) {
            toastr.info("See you!");
            localStorage.removeItem("user")
            
        } else {
            toastr.error("Failed to log out. Please try again later.");
        }
    }

</script>

<Link to="/" on:click={handleLogout}>Log out</Link>