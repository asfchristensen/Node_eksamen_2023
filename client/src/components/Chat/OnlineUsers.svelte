<script>
    import { usersInChatroom } from "../../stores/chatroom";
    
</script>
<h5>Online users</h5>

{#each $usersInChatroom as user}
    <p>{user.data.username}</p>
{/each}