<script>
    import "@picocss/pico";
    import { DoubleBounce } from "svelte-loading-spinners";

</script>

<div class="loader">
    <DoubleBounce size="70" color="#5192fb" unit="px" duration="1s" /><br>
</div>



<style>
     .loader {
        display: flex;
        justify-content: center;
        align-items: center;
    } 
</style>
