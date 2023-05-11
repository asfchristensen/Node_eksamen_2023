import { writable } from "svelte/store";


const savedUser = JSON.parse(localStorage.getItem("user"));
export const user = writable(savedUser || null);
export const mail = writable(null);
export const role = writable(null);

export const recipes = writable([]);