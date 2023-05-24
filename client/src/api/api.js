
export async function get(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}
// const response = await fetch(logoutURL, {
//    credentials: "include"
//});

export async function post (url, data ) {
   

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data,
        credentials: "include"
    });
    
    const result = await response.json();
    return result;
}

export async function patch (url, data) {
    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: data,
        credentials: "include"
    });
    return response;
}