<script>
    import { Route } from "svelte-navigator";
    import { user } from "../../stores/userGlobals.js";
    import PrivateRouteGuard from "./PrivateRouteGuard.svelte";
    
    export let role = 0;
    export let path;
</script>

<Route {path}>
    <PrivateRouteGuard>
        {#if role === $user.role || role === 0}
            <slot/> 
        {/if}
    </PrivateRouteGuard>
</Route>
