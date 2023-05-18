import { writable } from "svelte/store";

export const eventsDB = writable([]);
export const eventsToPublish = writable([]);