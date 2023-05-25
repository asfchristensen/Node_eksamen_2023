
export async function get(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

export async function getWithCredentials(url) {
    const response = await fetch(url, {
        credentials: "include"
    });
    const result = await response.json();
    return result;
}

export async function post(url, data ) {
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

export async function patch(url, data) {
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

export async function remove(url, data) {
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: data,
        credentials: "include"
    });
    return response;
    
}