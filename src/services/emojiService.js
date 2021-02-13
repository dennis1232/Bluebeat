export const emojiService = {
    getEmojis
}

function getEmojis() {
    return JSON.parse(JSON.stringify(gEmojis));
}

const gEmojis = [
    {
        id: 1,
        class: "far fa-smile",
    },
    {
        id: 2,
        class: "far fa-smile-wink",
    },
    {
        id: 3,
        class: "far fa-grin-stars",
    },
    {
        id: 4,
        class: "far fa-grin-squint-tears",
    },
    {
        id: 5,
        class: "far fa-dizzy",
    },
    {
        id: 6,
        class: "far fa-grin-tongue-squint",
    },
    {
        id: 7,
        class: "far fa-kiss-wink-heart",
    },
    {
        id: 8,
        class: "far fa-meh-rolling-eyes",
    },
    {
        id: 9,
        class: "far fa-sad-cry",
    },
    {
        id: 10,
        class: "far fa-angry",
    },
    {
        id: 11,
        class: "far fa-thumbs-up",
    },
    {
        id: 12,
        class: "far fa-thumbs-down",
    },
    {
        id: 13,
        class: "far fa-hand-peace",
    },
    {
        id: 14,
        class: "fas fa-glass-cheers",
    },
    {
        id: 15,
        class: "fas fa-praying-hands",
    },
    {
        id: 16,
        class: "fas fa-volume-up",
    },
    {
        id: 17,
        class: "fas fa-volume-mute",
    },
    {
        id: 18,
        class: "fas fa-music",
    },
    {
        id: 19,
        class: "fas fa-backward",
    },
    {
        id: 20,
        class: "fas fa-forward",
    },
    {
        id: 21,
        class: "fas fa-random",
    },
];