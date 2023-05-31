<script>
    export let action;
    export let loadingTitle;
    export let title;
</script>

{#if action}
    <button aria-busy={action}>{loadingTitle}</button>
{:else}
    <button type="submit">{title}</button>
{/if}

<style>
   button { margin-top: 1em; }
</style>