<script>
    import { BASE_URL } from "../../stores/urlDomain";
    import toastr from "toastr";

    let email = "laura@mail.dk";
    let phoneNumber = "";

    async function handleRequestNewPassword() {
        console.log("email + phone:", `${email}, ${phoneNumber}`);

        const userdetails = JSON.stringify({email, phoneNumber});
        console.log(userdetails);

        const response = await fetch($BASE_URL + "/api/auth/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: userdetails,
            credentials: "include"
        });
        const result = await response.json();
        console.log("result: ",result.message);
        console.log("status: ",result.ok);

        if (response.ok) {
            toastr.success("We send you an email")
        } else {
            toastr.error(result.message);
        }

        email = "laura@mail.dk";
        phoneNumber = "";
    }
</script>

<h1>Reset Password - 1</h1>
<h3>Get a activation code</h3>
<form on:submit|preventDefault={handleRequestNewPassword}>
    <label for="email">Your email:</label>
    <input type="email" placeholder="email" bind:value={email}>
    <label for="phone">Enter phone number</label>
    <input type="tel" placeholder="phone" bind:value={phoneNumber}>
    <button type="submit">Send activation code</button>
</form>
