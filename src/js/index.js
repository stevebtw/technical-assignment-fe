import { restartGame, setPlayMode, setRuleMode, playRound } from "./game";
import '../css/index.scss';

import "core-js/stable";
import "regenerator-runtime/runtime";

const init = () => {
    // assign event handlers to Player 1 choices
    let buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", playRound)
    }

    // change mode
    const el_play_options = document.getElementsByClassName('settings_mode');
    for (let i = 0; i < el_play_options.length; i++) {
        el_play_options[i].addEventListener("click", setPlayMode);
    }

    // change rules engine
    const el_mode_options = document.getElementsByClassName('settings_rules');
    for (let i = 0; i < el_mode_options.length; i++) {
        el_mode_options[i].addEventListener("click", setRuleMode);
    }

    // reset game
    document.getElementById('settings_reset').addEventListener("click", restartGame);

    restartGame();
}

if (window.addEventListener) { //when document is loaded initiate init
    document.addEventListener("DOMContentLoaded", init, false);
} else if (window.attachEvent) {
    document.attachEvent("onDOMContentLoaded", init);
}
