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
        text-decoration: none;
    }

    a:hover { 
        background-color: #1395c2;
        color: white; 
    }
</style>