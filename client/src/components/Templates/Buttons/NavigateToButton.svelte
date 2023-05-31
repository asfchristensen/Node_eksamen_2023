<script>
    import { navigate } from "svelte-navigator";

    export let path;
    export let buttonTitle;

    function handleNavigateTo() {
        navigate(path);
    }

</script>

<button on:click={handleNavigateTo}>{buttonTitle}</button>