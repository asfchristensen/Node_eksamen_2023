<script>
    import { user } from "../../stores/user.js";

    $: username = $user;
</script>

<h2>Profile</h2>
<h5>Welcome to your profile page <span class="user">{username}</span></h5>


<style>
    .user {
        font-size: large;
        font-weight: bold;
        color: rgb(209, 76, 232);
    }
</style>