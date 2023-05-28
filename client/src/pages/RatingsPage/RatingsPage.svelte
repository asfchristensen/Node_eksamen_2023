<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain";
    import { ratingsToPublic } from "../../stores/ratings";
    import { get } from "../../api/api";

    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import MakePublicRatings from "../../components/Ratings/MakePublicRatings.svelte";
    import UserCounter from "../../components/UserCounter/UserCounter.svelte";

    onMount(async () => {
        await handleGetAllNotPublicRatings();
    });

    async function handleGetAllNotPublicRatings() {
        const url = $BASE_URL + "/api/admin/ratings/not-public";
        const result = await get(url);
        console.log(result.data);
        ratingsToPublic.set(result.data);
        return result.data;
    }

</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>Ratings from users</h2>
        <MakePublicRatings/> 
    </div>
    <div class="col-right">
        <UserCounter/>
    </div>
</div>