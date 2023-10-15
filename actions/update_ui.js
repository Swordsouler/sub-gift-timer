const setGameState = (new_game_state) => {
    if (game_state !== "none")
        document.getElementById(game_state).classList.add("off");
    game_state = new_game_state;
    document.getElementById(game_state).classList.remove("off");
};

const emoteWin = () => {
    setGameState("emote-win");
};

const timerWin = () => {
    setGameState("timer-win");
    document.getElementById("ban-number").innerHTML = bad_user.length;
};

const startGame = () => {
    console.log(game_state);
    if (game_state === "game") return;
    setGameState("game");
    reset();
    console.log("start game");
};

const updateTime = () => {
    // change text
    const timerElement = document.getElementById("timer");
    timerElement.innerHTML = (timer / 1000).toFixed(1) + "s";
    const barElement = document.getElementById("bar-fill-timer");
    barElement.style.width = (timer / max_timer()) * 100 + "%";
};

const updateGoal = () => {
    // change text
    const giftElement = document.getElementById("gift");
    giftElement.innerHTML = count_emote + "/" + goal_emote();
    const barElement = document.getElementById("bar-fill-gift");
    barElement.style.width = (count_emote / goal_emote()) * 100 + "%";
};

const receiveSubGift = (amount) => {
    startGame();
    count_gift += amount;
    timer += amount * timer_scale;
    updateGoal();
};

const receiveEmote = (user) => {
    if (good_user.includes(user)) return;
    count_emote++;
    updateGoal();
    good_user.push(user);
    removeBadUser(user);
    if (count_emote >= goal_emote()) {
        emoteWin();
    }
};

const addBadUser = (user) => {
    if (!bad_user.includes(user) && !good_user.includes(user))
        bad_user.push(user);
};

const removeBadUser = (user) => {
    bad_user = bad_user.filter((item) => item !== user);
};

const updateBadUser = () => {
    const badUserElement = document.getElementById("bad-user");
    badUserElement.innerHTML = bad_user.length;
};

setInterval(() => {
    if (game_state !== "game") return;
    if (timer > 0) {
        timer -= update_speed;
    } else {
        timerWin();
    }
    updateTime();
}, update_speed);
