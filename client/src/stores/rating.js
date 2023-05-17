import { writable } from "svelte/store";

const ratingSeeds = [
    { 
        isPublished: false,
        rating: 3, 
        comment: 'Fin app', 
        username: 'Sovse Per',
        isDeleted: false 
    },
    { 
        isPublished: false,
        rating: 4, 
        comment: 'Er glad for denne app. Den inspirerer mig', 
        username: 'Flyvende Birgitte',
        isDeleted: false  
    },
    { 
        isPublished: false,
        rating: 5, 
        comment: 'Elsker alt ved denne', 
        username: 'HotMamma',
        isDeleted: false  
    },
]

export const ratings = writable(ratingSeeds);
export const publishedRatings = writable([]);
