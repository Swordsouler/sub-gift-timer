document.addEventListener("keypress", (event) => {
    // if +
    if (event.keyCode === 43) {
        receiveSubGift(5);
    }
    // if -
    if (event.keyCode === 45) {
        const random = Math.floor(Math.random() * 100);
        receiveEmote(random);
    }
});
