import { writable } from "svelte/store";

export const user = writable(null);
export const mail = writable(null);
export const role = writable(null);
export const recipes = writable([]);