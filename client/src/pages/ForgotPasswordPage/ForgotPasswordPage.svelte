<script>
    import { BASE_URL } from "../../stores/urlDomain";
    import { post } from "../../api/api.js";
    import { navigate } from "svelte-navigator";
    import toastr from "toastr";
    import LoadingButton from "../../components/Templates/Buttons/LoadingButton.svelte";

    let email = "laura@mail.dk";
    let phoneNumber = "";
    let smsOK = false;

    async function handleRequestNewPassword() {
        const url = $BASE_URL + "/api/auth/forgot-password";
        const userInfoToJSON = JSON.stringify({ email, phoneNumber });

        const result = await post(url, userInfoToJSON);

        if (result.status === 200) {
            toastr.success(result.message);
            smsOK = true;
            setTimeout(() => {
                navigate("/update-password", {replace: true});
                smsOK = false; 
            }, 5000);
        } else {
            toastr.error(result.message);
        }
        
        email = "laura@mail.dk";
        phoneNumber = "";
    }
</script>

<div class="grid">
    <div class="col-left"></div>


    <div class="col-middle">
        <h2>Reset Password</h2>
        <form on:submit|preventDefault={handleRequestNewPassword}>
            <input type="email" placeholder="Email" bind:value={email} required>
            <input type="tel" placeholder="phone" bind:value={phoneNumber} required>
            <LoadingButton action={smsOK} loadingTitle="Sending activation code on SMS..." title="Send activation code"/>
        </form>
    </div>

    <div class="col-right"></div>
</div>

<style>
    form { margin: 10%; }
</style>