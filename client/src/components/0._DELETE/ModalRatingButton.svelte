<!-- <script>
    import "@picocss/pico";
    import { Link } from "svelte-navigator";

    export let ratingToRead;
    
    let isClicked = false;

    console.log("before clicked: ", isClicked);
    async function handleModal () {
        isClicked = !isClicked;
        console.log("after cliked: ",isClicked);
    }

</script>


<button on:click={handleModal}>Read comment</button>


{#if isClicked}
    <dialog open>
        <article>
                <Link to="/rating" class="close" on:click={handleModal}></Link>
                <div class="rating-container">
                    <h3>{ratingToRead.username}</h3>
                    <h3 id="rating-number">{ratingToRead.rating}</h3>
                    <img src="../icons/star.png" alt="star">
                </div>
                <p>{ratingToRead.comment}</p>
        </article>
    </dialog>
{/if}


<style>
    article p {
        font-size: 25px;
    }

    .rating-container {
        display: flex;
        align-items: center;
    }

    #rating-number {
        color: #4f81bd;
        margin-left: 3%;
    }

    img {
        height: 5%;
        width: 5%;
        margin-left: 1%;
        vertical-align: middle;
        margin-bottom: 7%;
    }
</style> -->