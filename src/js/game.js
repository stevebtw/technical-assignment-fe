const settings = {
    is_headless: false, // set to true for testing
    play_mode: "manual", // manual | auto
    rule_mode: "classic", // classic | advanced
    rules: {
        classic: {
            "ROCK": ["SCISSORS"],
            "PAPER": ["ROCK"],
            "SCISSORS": ["PAPER"]
        },
        advanced: {
            "ROCK": ["SCISSORS", "LIZARD"],
            "PAPER": ["ROCK", "SPOCK"],
            "SCISSORS": ["PAPER", "LIZARD"],
            "LIZARD": ["SPOCK", "PAPER"],
            "SPOCK": ["SCISSORS", "ROCK"]
        }
    },
    players: [
        {
            score: 0
        },
        {
            score: 0
        }
    ]
}

const restartGame = () => {
    settings.players[0].score = 0;
    settings.players[1].score = 0;

    settings.players[0].choice = "";
    settings.players[1].choice = "";

    setButtonOptions();
    updateDom();

}

const setPlayMode = (event) => {
    settings.play_mode = event.target.textContent.toLowerCase();
    restartGame();
}

const setRuleMode = (event) => {
    settings.rule_mode = event.target.textContent.toLowerCase();
    restartGame();
}
const getRules = () => {
    return settings.rules[settings.rule_mode];
}
const playRound = (event) => {
    const player1_choice = getPlayerChoice(event);
    const player2_choice = getPlayerChoice();

    setChoices(player1_choice, player2_choice);

    const result = getWinner(player1_choice, player2_choice);

    if (result === "WIN") {
        setScore(settings.players[0]);
    } else if (result === "LOSE") {
        setScore(settings.players[1]);
    }

    updateDom();
}

const getPlayerChoice = (event) => {
    // if click event and manual mode, get user choice
    if (event && settings.play_mode === "manual") {
        return event.target.innerText
    } else {
        return getRandomChoice();
    }
}

const setChoices = (player1_choice, player2_choice) => {
    settings.players[0].choice = player1_choice;
    settings.players[1].choice = player2_choice;
}

const setScore = (player) => {
    player.score++;
}

const getRandomChoice = () => {
    // get array of playable strings
    const choices = Object.keys(getRules());

    // pick a random number and return
    const idx = Math.floor(Math.random() * choices.length);

    return choices[idx];
}

const getWinner = (player1_choice, player2_choice) => {
    const rules = getRules();
    if (rules[player1_choice].indexOf(player2_choice) > -1) {
        // player 1 wins
        return "WIN";
    } else if (rules[player2_choice].indexOf(player1_choice) > -1) {
        // player 2 wins
        return "LOSE";
    } else {
        // draw
        return "DRAW";
    }
}

const setDomText = (id, str) => {
    document.getElementById(id).textContent = str || "";
}

const setButtonOptions = () => {
    if (!settings.is_headless) {
        if (settings.play_mode === "manual") {
            // toggle play options
            document.getElementById('play_buttons').style.display = "block";
            document.getElementById('play_button').style.display = "none";

            const buttons_advanced = document.getElementsByClassName('button_advanced');

            // HTML elements don't have forEach Method so call this way
            Array.prototype.forEach.call(buttons_advanced, function (button) {
                const button_display = settings.rule_mode === "classic" ? "none" : "inline";
                button.style.display = button_display;
            });
        } else {
            // toggle play options
            document.getElementById('play_buttons').style.display = "none";
            document.getElementById('play_button').style.display = "block";
        }
    }
}

const updateDom = () => {
    if (!settings.is_headless) {
        settings.players.forEach((player, i) => {
            const idx = i + 1;
            setDomText("choice" + idx, player.choice);
            setDomText("score" + idx, player.score);
        });
    }
}

export { settings, playRound, restartGame, setPlayMode, setRuleMode, getRules, getRandomChoice, getWinner, setScore }