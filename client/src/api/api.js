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