import { readable } from "svelte/store";

export const pictures = readable([
    { picURL: "../pictures/appetizer.jpg" },
    { picURL: "../pictures/lunch.jpg" },
    { picURL: "../pictures/dinner.jpg" },
    { picURL: "../pictures/sweets.jpg" },
    { picURL: "../pictures/breakfast.jpg" }
]);