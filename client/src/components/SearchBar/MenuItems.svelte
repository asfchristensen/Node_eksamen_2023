<script>
    // exportere denne for at vi kan tage imod den værdi, som searchbar kan give os. (searchbar skal have en variablet den kan putte værdien (label) ind i )
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

    a:hover {
        background-color: deeppink;
    }
</style>