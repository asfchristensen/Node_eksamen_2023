<script>
    import { onMount, onDestroy } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain";
    import { get } from "../../api/api.js"
    import { user } from "../../stores/userGlobals";
    import { userMessages, usersInChatroom } from "../../stores/chatroom.js";
    import io from "socket.io-client";
    import toastr from "toastr";

    let message = "";
    let socket = io($BASE_URL);
    let messageFromUser = null;
    let onlineUsers = null;


    onMount( async () => {
        await handleGetAllMessages(); 
        
    });

    async function handleGetAllMessages() {
        const url = $BASE_URL + "/api/messages"
        const result = await get(url);
        console.log(result.data);
        userMessages.set(result.data);
    }

    onDestroy( () => {
        socket.emit("leave room", { user: $user });
    })

    socket.on("User left the room", (data) => {
        console.log("Data: ", data);
        console.log("User object: ", data.user.username);
        toastr.error(data.user.username + " left room");
        console.log("disconnect");
    });

    // start besked
    socket.emit("User joins room", { data: $user });

    socket.on("chatUsers", (users) => {
        console.log("chatUsers", users); //[socket.id].data.username);
        $usersInChatroom = Object.values(users).filter(Boolean);
        console.log("Lenght of users in chatroom array: ", $usersInChatroom.length);
    });

    socket.on("User joined Room", (user) => {
        console.log("User who joined: ", user.data.username);
        toastr.success(user.data.username + " joined the room");
   
        console.log("joined the room", user.data.username );
        console.log("users in chatroom: ", $usersInChatroom.length);
    });

    async function handleSendMessage() {
        const today = new Date();
        const date = today.toLocaleDateString("en-US", { dateStyle: "medium" }); 
        const time = today.toLocaleTimeString("en-US", { timeStyle: "short" });
        console.log("Date ", date);
        console.log("Time ", time);
        messageFromUser = { sentDate: date, sentTime: time, sender: $user.username, senderEmail: $user.email, sentMessage: message };

        const messageToJSON = JSON.stringify(messageFromUser);
        const response = await fetch($BASE_URL + "/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: messageToJSON,
            credentials: "include"
        });

        if (response.ok) {
            socket.emit("Let's Taco 'Bout It Room chatmessages", messageFromUser);
        } else {
            toastr.error("Unable to send message");
        }

        message = "";
    }

    socket.on("message", (messageData) => {
        console.log("Data ", messageData);

        userMessages.update(list => {
            list.push({
                sentDate: messageData.sentDate, 
                sentTime: messageData.sentTime, 
                sender: messageData.sender, 
                sentMessage: messageData.sentMessage
            });
            return list;
        }); 
        console.log($userMessages.length);
        $userMessages.forEach(element => console.log("forEach in store:", element));
    }); 
</script>

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
      <input type="text" bind:value={message} placeholder="Type your message..." />
      <button on:click={handleSendMessage}>Send message</button>
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

    #content-placement-user, #content-placement-other {
        display: block;
        text-align: left;
    }

    .content {
        padding: 1em;
        max-width: 70%;
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
  
    /* Kan det ændres til at modtage andre ting også?*/
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
