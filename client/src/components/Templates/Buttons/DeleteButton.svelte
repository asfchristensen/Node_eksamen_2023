<script>
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { remove } from "../../../api/api.js";
    import toastr from "toastr";

    export let objectToDelete;
    export let onHandleUpdate;
    export let endpoint;
    export let objectName;

    async function handleDelete(objectToDelete) {
        console.log(objectToDelete);
        objectToDelete.isDeleted = true;
        const url = $BASE_URL + endpoint;
        const objectToJSON = JSON.stringify(objectToDelete);
        console.log("ToJSON: ", objectToJSON);

        const response = await remove(url, objectToJSON);
        console.log(response);

        if (response.ok) {
            toastr.success(`${objectName} deleted`);
            await onHandleUpdate();
        } else {
            toastr.error(`${objectName} failed to delete`);
        }
    } 
</script>

<button on:click={handleDelete.bind(null, objectToDelete)} class="delete-button">Delete</button>
    

