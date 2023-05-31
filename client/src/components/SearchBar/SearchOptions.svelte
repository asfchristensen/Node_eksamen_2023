<script>
    export let label;
    export let recipe_id;
</script>

<a href="#{recipe_id}">{label}</a>

<style>
    a {
        color: black;
        padding: 1em;
        display: block;
    }

    a:hover { background-color: deeppink; }
</style>