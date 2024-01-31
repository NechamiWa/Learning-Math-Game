let gamesArr = JSON.parse(localStorage.getItem('gamesArr')) || [];

init();
function init() {
    document.getElementById("finished").addEventListener('click', saveGamesData);
}

function saveGamesData(e) {
    const teacherCode = 10;
    const gameCode = document.getElementById("gameCode").value;
    if (gameCode.length < 8)
        {
            alert("you must write at least 8 characters code");
            e.preventDefault();
        }
    const operator = document.getElementById("operator").value;
    const sum = document.getElementById("sum").value;

    if (teacherCode && gameCode && operator && sum) {
        if (!isGameExist(gameCode)) {
            alert("There is such code, enter another one");
            e.preventDefault();
        }
        else {
            gamesArr.push({ TCode: teacherCode, GCode: gameCode, Goperator: operator, Gsum: sum });
            localStorage.setItem('gamesArr', JSON.stringify(gamesArr));
        }
    }
    else {
        alert("You must fill all details");
        e.preventDefault();
    }
}

function isGameExist(gameCode) {
    for (let i = 0; i < gamesArr.length; i++) {
        if (gamesArr[i].GCode === gameCode)
            return false;
    }
    return true;
}