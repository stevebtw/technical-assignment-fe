import { settings, setPlayMode, restartGame, setRuleMode, getRules, getWinner, setScore, getRandomChoice } from "../src/js/game";

beforeEach(() => {
    settings.is_headless = true;
    restartGame();
});

//// setup
test("restartGame() is initialised with default values", () => {
    expect(settings.players[0].score).toBe(0);
    expect(settings.players[1].score).toBe(0);
});

test("setPlayMode() changes playing mode", () => {
    // takes event.target so mock
    let event = {
        target: {
            textContent: "Manual"
        }
    }
    setPlayMode(event);
    expect(settings.play_mode).toBe('manual');

    event = {
        target: {
            textContent: "Auto"
        }
    }
    setPlayMode(event);
    expect(settings.play_mode).toBe('auto');
});

test("setRuleMode() to set the correct rules mode", () => {
    // takes event.target so mock
    let event = {
        target: {
            textContent: "Classic"
        }
    }
    setRuleMode(event);
    expect(settings.rule_mode).toBe('classic');
    expect(getRules()).toStrictEqual({
        "ROCK": ["SCISSORS"],
        "PAPER": ["ROCK"],
        "SCISSORS": ["PAPER"]
    });

    event = {
        target: {
            textContent: "Advanced"
        }
    }
    setRuleMode(event);
    expect(settings.rule_mode).toBe('advanced');
    expect(getRules()).toStrictEqual({
        "ROCK": ["SCISSORS", "LIZARD"],
        "PAPER": ["ROCK", "SPOCK"],
        "SCISSORS": ["PAPER", "LIZARD"],
        "LIZARD": ["SPOCK", "PAPER"],
        "SPOCK": ["SCISSORS", "ROCK"]
    })
});

test("getRandomChoice() returns a string", () => {
    expect(getRandomChoice()).not.toBeUndefined();
    expect(getRandomChoice()).toMatch(/ROCK|PAPER|SCISSORS|LIZARD|SPOCK/)
});

// rules
test("getWinner() picks the correct value", () => {
    expect(getWinner('ROCK', 'PAPER')).toBe("LOSE");
    expect(getWinner('ROCK', 'SCISSORS')).toBe("WIN");
    expect(getWinner('ROCK', 'ROCK')).toBe("DRAW");

    expect(getWinner('PAPER', 'PAPER')).toBe("DRAW");
    expect(getWinner('PAPER', 'SCISSORS')).toBe("LOSE");
    expect(getWinner('PAPER', 'ROCK')).toBe("WIN");

    expect(getWinner('SCISSORS', 'PAPER')).toBe("WIN");
    expect(getWinner('SCISSORS', 'SCISSORS')).toBe("DRAW");
    expect(getWinner('SCISSORS', 'ROCK')).toBe("LOSE");

    // test advanced rules
    settings.rule_mode = "advanced";

    expect(getWinner('ROCK', 'SPOCK')).toBe("LOSE");
    expect(getWinner('ROCK', 'LIZARD')).toBe("WIN");

    expect(getWinner('PAPER', 'SPOCK')).toBe("WIN");
    expect(getWinner('PAPER', 'LIZARD')).toBe("LOSE");

    expect(getWinner('SCISSORS', 'SPOCK')).toBe("LOSE");
    expect(getWinner('SCISSORS', 'LIZARD')).toBe("WIN");

    expect(getWinner('LIZARD', 'SPOCK')).toBe("WIN");
    expect(getWinner('LIZARD', 'LIZARD')).toBe("DRAW");
    expect(getWinner('LIZARD', 'ROCK')).toBe("LOSE");
    expect(getWinner('LIZARD', 'PAPER')).toBe("WIN");
    expect(getWinner('LIZARD', 'SCISSORS')).toBe("LOSE");

    expect(getWinner('SPOCK', 'SPOCK')).toBe("DRAW");
    expect(getWinner('SPOCK', 'LIZARD')).toBe("LOSE");
    expect(getWinner('SPOCK', 'ROCK')).toBe("WIN");
    expect(getWinner('SPOCK', 'PAPER')).toBe("LOSE");
    expect(getWinner('SPOCK', 'SCISSORS')).toBe("WIN");

});

test("setScore() should update a players score by 1", () => {
    const player1 = settings.players[0];
    const player2 = settings.players[1];

    setScore(player1);
    expect(player1.score).toBe(1);
    expect(player2.score).toBe(0);

    setScore(player1);
    expect(player1.score).toBe(2);
    expect(player2.score).toBe(0);
});