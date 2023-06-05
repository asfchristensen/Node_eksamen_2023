<script>
    import { onMount, onDestroy } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { get, post } from "../../api/api.js";
    import { user } from "../../stores/userGlobals.js";
    import { userMessages, usersInChatroom } from "../../stores/chatroom.js";
    import io from "socket.io-client";
    import Sidebar from "../../components/Navbars/Sidebar.svelte";
    import toastr from "toastr";

    let message = "";
    let socket = io($BASE_URL);

    onMount(async () => {
        await handleGetAllMessages(); 
    });

    async function handleGetAllMessages() {
        const url = $BASE_URL + "/api/both/chat_messages";
        const result = await get(url);

        if (result.status === 200) {
            userMessages.set(result.data);
        } else {
            toastr.error("Failed to get all messages");
        }
    }

    onDestroy(() => {
        socket.emit("leave room", { user: $user });
    });

    socket.on("User left the room", (data) => {
        toastr.error(data.user.username + " left room");
    });

    socket.emit("User joins room", { data: $user });
  
    socket.on("chatUsers", (users) => {
        $usersInChatroom = Object.values(users).filter(Boolean);
    });

    socket.on("User joined Room", (user) => {
        toastr.success(user.data.username + " joined the room");
    });

    async function handleSendMessage() {
        const url = $BASE_URL + "/api/both/chat_messages";

        const today = new Date();
        const date = today.toLocaleDateString("en-US", { dateStyle: "medium" }); 
        const time = today.toLocaleTimeString("en-US", { timeStyle: "short" });

        const messageFromUser = { 
            sentDate: date, 
            sentTime: time, 
            sender: $user.username, 
            senderEmail: $user.email, 
            sentMessage: message 
        };
        const messageToJSON = JSON.stringify(messageFromUser);

        const result = await post(url, messageToJSON);

        if (result.status === 200) {
            socket.emit("Let's Taco 'Bout It Room chatmessages", messageFromUser);
        } else {
            toastr.error("Unable to send message");
        }

        message = "";
    }

    socket.on("message", (messageData) => {
        userMessages.update(list => {
            list.push({
                sentDate: messageData.sentDate, 
                sentTime: messageData.sentTime, 
                sender: messageData.sender, 
                sentMessage: messageData.sentMessage
            });
            return list;
        }); 
    }); 
</script>

<div class="grid">
    <div class="col-left">
        <Sidebar/>
    </div>
    <div class="col-middle">
        <div class="chatroom">
            <h2>Let's Taco 'Bout It</h2>
            <div class="messages">
                {#each $userMessages as userMessage}
                    {#if userMessage.sender === $user.username}
                        <div class="user-message"> 
                            <div class="content">
                                <p><span id="user-sender">{userMessage.sender} – {userMessage.sentTime} {userMessage.sentDate}</span></p>
                                <p id="content-placement-user">{userMessage.sentMessage}</p>
                            </div>
                        </div>
                    {:else}
                        <div class="other-message"> 
                            <div class="content">
                                <p><span id="other-sender">{userMessage.sender} – {userMessage.sentTime} {userMessage.sentDate}</span></p>
                                <p id="content-placement-other">{userMessage.sentMessage}</p>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
            <div class="input-container">
              <input type="text" bind:value={message} placeholder="Type your message..."/>
              <button on:click={handleSendMessage}>Send message</button>
            </div>
        </div>
    </div>
    <div class="col-right">
        <h5>Online users</h5>
        {#each $usersInChatroom as user}
            <p>{user.data.username}</p>
        {/each}
    </div>
</div>

<style>
    .chatroom {
        display: flex;
        flex-direction: column;
        height: 100vh;
        padding: 2em;
        background-color: #f2f2f2;
        font-family: Arial, sans-serif;
    }

    h2 {
        text-align: center;
        margin-bottom: 1em;
    }

    .messages {
        flex-grow: 1;
        overflow-y: scroll;
        padding: 1em;
        margin-bottom: 1em;
    }

    #content-placement-user {
        display: flex;
        flex-direction: row-reverse;
    }

    #content-placement-other {
        display: block;
        text-align: left;
    }

    .content {
        padding: 0.8em 0.8em 0.1em 0.8em;
        width: 70%;
    }

    #user-sender {
        display: block;
        font-weight: bold;
        text-align: right;
    }

    #other-sender {
        display: block;
        font-weight: bold;
        text-align: left;
    }

    .user-message {
        display: flex;
        justify-content: right;
        background-color: #c8e6c9;
        width: 50%;
        margin-bottom: 0.5em;
        border-radius: 1em;
        margin-left: auto;
    }

    .other-message {
        background-color: #e0e0e0;
        width: 50%;
        margin-bottom: 0.5em;
        border-radius: 1em;
    }

    .input-container {
        display: flex;
        gap: 1em;
    }

    .input-container input[type="text"] {
        flex-grow: 1;
        padding: 0.5em;
        font-size: 1em;
    }

    .input-container button {
        padding: 0.5em 0.5em;
        font-size: 1em;
        background-color: #333;
        color: #fff;
        border: none;
        cursor: pointer;
    }
</style>
