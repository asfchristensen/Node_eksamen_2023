<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../../stores/userGlobals.js";

    export let navigate = useNavigate();
    export let location = useLocation();

    $: if (!$user) {
        navigate("/login", {
            state: { from: $location.pathname },
            replace: true
        });
    }
</script>

{#if $user}
    <slot/>
{/if}