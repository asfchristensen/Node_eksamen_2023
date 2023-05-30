<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { ratingsToPublic } from "../../../stores/ratings.js";
    import { get, patch } from "../../../api/api.js";
    import { Link } from "svelte-navigator";
    import toastr from "toastr";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import UserCounter from "../../../components/UserCounter/UserCounter.svelte";
    import DeleteButton from "../../../components/Templates/Buttons/DeleteButton.svelte";
    import Modal from "../../../components/Templates/Modal/Modal.svelte";

    let isModalOpen = false;
    let ratingToRead = null;

    onMount(async () => {
        await handleGetAllNotPublicRatings();
    });

    async function handleGetAllNotPublicRatings() {
        const url = $BASE_URL + "/api/admin/ratings/not-public";
        const result = await get(url);
        ratingsToPublic.set(result.data);
        return result.data;
    }

    async function handleModal (rating) {
        isModalOpen = !isModalOpen;
        ratingToRead = rating;
    }

    async function handleCreatePublicRating() {
        const url = $BASE_URL + "/api/admin/ratings";
        const ratingToPublic = $ratingsToPublic.filter(rating => rating.isPublic === true);
        const ratingToJSON = JSON.stringify(ratingToPublic);

        const result = await patch(url, ratingToJSON);

        if (result.status === 200) {
            toastr.success("success - rating is now public");
            ratingsToPublic.update(ratings => ratings.filter(rating => !rating.isPublic));
        } else {
            toastr.error("error - making rating public")
        }
    }
</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>Ratings from users</h2>

        {#if $ratingsToPublic !== undefined}
            <table role="grid">
                <thead>
                    <tr>
                        <th scope="col">MAKE PUBLIC</th>
                        <th scope="col">FROM</th>
                        <th scope="col">RATING</th>
                        <th scope="col">READ</th>
                        <th scope="col">DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $ratingsToPublic as rating }  
                        <tr>
                        <td><input type="checkbox" bind:checked={rating.isPublic}></td>
                        <td>{rating.username}</td>
                        <td>{rating.rating}</td>
                        <td><button on:click={handleModal.bind(null, rating)}>Read comment</button></td>
                        <td><DeleteButton 
                            objectToDelete={rating} 
                            onHandleUpdate={handleGetAllNotPublicRatings} 
                            endpoint="/api/admin/ratings" 
                            objectName="Rating"
                        /></td>
                        </tr>
                    {/each} 
                </tbody>
            </table>

            <button on:click={handleCreatePublicRating}>Make rating(s) public</button>
        {:else}
            <p>No ratings to make public at the moment...</p>
        {/if}
    </div>
    <div class="col-right">
        <UserCounter/>
    </div>
</div>

<Modal 
    isOpen={isModalOpen}
    onModal={handleModal}
    path="/rating"
    header=""
>
    <div class="rating-container">
        <h3>{ratingToRead.username}</h3>
        <h3 id="rating-number">{ratingToRead.rating}</h3>
        <img src="../icons/star.png" alt="star">
    </div>
    <p>{ratingToRead.comment}</p>
</Modal> 

<style>
    p { color: rgb(108, 134, 143); }

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
</style>