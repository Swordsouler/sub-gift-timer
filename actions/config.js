const TWITCH_ACCESS_TOKEN = "<ENTER_YOUR_TWITCH_ACCESS_TOKEN>";
const TWITCH_CLIENT_ID = "<ENTER_YOUR_TWITCH_CLIENT_ID>";
const TWITCH_BROADCASTER_ID = "<ENTER_YOUR_TWITCH_BROADCASTER_ID>";

const emote = "crocoGIFT"; // emote to count
const update_speed = 100;
const timer_scale = 2000; // 1 sub = +[timer_scale] millisecond
const goal_emote_scale = 4; // 1 sub = +[goal_emote_scale] emote to the goal

let timer = 0; // current timer in millisecond
let count_emote = 0; // number of emote received
let bad_message = 0; // a bad message is a message that doesn't contain the subgift emote
let count_gift = 0; // number of sub gift

let good_user = []; // list of user that sent the emote
let bad_user = []; // list of user that sent a bad message

let game_state = "none"; // "timer-win" | "timer-win" | "game" | "none"

const reset = () => {
    timer = 0;
    count_emote = 0;
    bad_message = 0;
    count_gift = 0;
};

const goal_emote = () => {
    return count_gift * goal_emote_scale;
};

const max_timer = () => {
    return count_gift * timer_scale;
};

//transition-duration
document.getElementById("bar-fill-timer").style.transitionDuration =
    update_speed + "ms";
document.getElementById("bar-fill-gift").style.transitionDuration =
    update_speed + "ms";
