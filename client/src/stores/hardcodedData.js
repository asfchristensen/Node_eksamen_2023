import { readable } from "svelte/store";

export const categories = readable([
    { text: "Breakfast" },
    { text: "Lunch" },
    { text: "Dinner" },
    { text: "Appetizer" },
    { text: "Sweets" },
    { text: "Baking" }
]);

export const profilePics = readable([
    { id: 1, img: "../profilePictures/default.png" },
    { id: 2, img: "../profilePictures/alien.png" },
    { id: 3, img: "../profilePictures/cheese.png" },
    { id: 3, img: "../profilePictures/chef.png" },
    { id: 3, img: "../profilePictures/christmas.png" }
]);