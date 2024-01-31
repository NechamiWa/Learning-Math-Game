let gamesArr = JSON.parse(localStorage.getItem('gamesArr')) || [];
let gameDetailsArr = JSON.parse(sessionStorage.getItem('gameDetailsArr')) || [];

init();
function init() {
    document.getElementById("intoGame").addEventListener('click', getGameData);
}

function getGameData(e) {
    const game = document.getElementById("game").value;
    let place = isGameExist(game);
    if (place === -1) {
        alert("Error! this code is not exist")
        e.preventDefault();
    }
    else {
        gameDetailsArr[0] = gamesArr[place].Goperator;
        gameDetailsArr[1] = gamesArr[place].Gsum;
        sessionStorage.setItem('gameDetailsArr', JSON.stringify(gameDetailsArr));
    }
}

function isGameExist(game) {
    for (let i = 0; i < gamesArr.length; i++) {
        if (gamesArr[i].GCode === game)
            return i;
    }
    return -1;
}