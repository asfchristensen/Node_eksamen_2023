<script>
    import { Link } from "svelte-navigator";

    export let isOpen = false;
    export let onModal;
    export let path;
    export let header;
</script>

{#if isOpen}
    <dialog open>
        <article>
            <header><Link to={path} class="close" on:click={onModal}></Link>
                <h4>{header}</h4>
            </header>
            <slot/>
        </article>
  </dialog>
{/if}

<style>
    header h4 { margin-bottom: 0.1em; }

    article {
        width: 40em;
    }
</style>


