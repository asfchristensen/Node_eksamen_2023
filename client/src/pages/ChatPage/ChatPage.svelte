<script>
    import Chat from "../../components/Chat/Chat.svelte";
    import { onMount, onDestroy } from "svelte";
    import { BASE_URL } from "../../stores/urlDomain";
    import { user } from "../../stores/user";
    import { userMessages, usersInChatroom } from "../../stores/chatroom";
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
        const response = await fetch($BASE_URL + "/api/messages");
        const result = await response.json();
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
    })

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
        messageFromUser = { sentDate: date, sentTime: time, sender: $user.username, sentMessage: message };

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

<h1>Let's Taco 'Bout It</h1>

<input type="text" bind:value={message}>
<button on:click={handleSendMessage}>Send message</button>

<!-- Løber igennem listen fra DB -->
{#each $userMessages as userMessage}
    <p>{userMessage.sender} says: {userMessage.sentMessage}</p>
{/each}

<h1>Online users:</h1><br>
{#each $usersInChatroom as user}
    <p>{user.data.username}</p>
{/each}


<Chat/>