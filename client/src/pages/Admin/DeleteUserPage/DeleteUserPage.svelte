<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../../stores/urlDomain.js";
    import { allUsers } from "../../../stores/adminGlobals.js";
    import { get } from "../../../api/api.js";
    import Sidebar from "../../../components/Navbars/Sidebar.svelte";
    import UserCounter from "../../../components/UserCounter/UserCounter.svelte";
    import DeleteButton from "../../../components/Templates/Buttons/DeleteButton.svelte";
    import toastr from "toastr";

    onMount(async () => {
        await handleGetAllUsers();
    });

    async function handleGetAllUsers() {
        const url = $BASE_URL + "/api/admin/users";
        const result = await get(url);

        if (result.status === 200) {
            allUsers.set(result.data);
            return result.data;
        } else {
            toastr.error("Failed to get all users");
        }
    }
</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <h2>Users overview</h2>

        <table role="grid">
            <thead>
                <tr>
                    <th scope="col">USERNAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">MEMBER SINCE</th>
                    <th scope="col">AMOUNT OF RECIPES</th>
                    <th scope="col">DELETE</th>
                </tr>
            </thead>
            <tbody>
                {#each $allUsers as user }  
                    <tr>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.memberSince}</td>
                        {#if user.recipes === undefined}
                            <td>0</td>
                        {:else}
                            <td>{user.recipes.length}</td>
                        {/if}
                        <td><DeleteButton 
                            objectToDelete={user} 
                            onHandleUpdate={handleGetAllUsers} 
                            endpoint="/api/admin/users/{user._id}" 
                            objectName="User"
                            />
                        </td>
                    </tr>
                {/each} 
            </tbody>
        </table>    
    </div>
    <div class="col-right">
        <UserCounter/>
    </div>
</div>
