<script>
    import { navigate } from "svelte-navigator";

    export let path;

    function handleNavigateTo() {
        navigate(path);
    }
</script>

<button on:click={handleNavigateTo}>Go back</button>