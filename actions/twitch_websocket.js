const config = {
    identity: {
        id: TWITCH_CLIENT_ID,
        accessToken: TWITCH_ACCESS_TOKEN,
    },
    listener: { type: "websocket" },
};

// make a 1 second delay before connecting to the websocket
// to prevent 429 error (we wait the previous socket from the reload to be closed)
setTimeout(() => {
    const tes = new TES(config);

    /* handle event */
    tes.on("channel.subscription.gift", (event) => {
        console.log(event);
    });

    /* subscribe to event */
    const createSubscription = (
        subscription,
        condition = {
            broadcaster_user_id: TWITCH_BROADCASTER_ID,
        },
        version = 1
    ) => {
        tes.subscribe(subscription, condition, version)
            .then(() => console.log("Subscription successful: " + subscription))
            .catch((err) => {
                console.log(err);
                //if it fails, try again in 2 seconds
                setTimeout(() => {
                    createSubscription(subscription, condition, version);
                }, 5000);
            });
    };

    createSubscription("channel.subscription.gift");
}, 1000);
