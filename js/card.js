let video = document.getElementById("myVideo");
let gameDetailsArr = JSON.parse(sessionStorage.getItem('gameDetailsArr')) || [];
let numberChoice = parseInt(gameDetailsArr[1]);
let operatorChoice = gameDetailsArr[0];
let startTime;
let tries;
let instructions;

//פונקציה לאתחול המשחק
function restartGame() {
    startTime = new Date();
    tries = 0;
}
restartGame();

//הוראות למשחק הנוכחי
function showInstructions(numberChoice, operatorChoice) {
    const headmain = document.querySelector('main');
    instructions = document.createElement("h2");
    instructions.innerHTML = `Make pairs whose their ${operatorChoice} makes the number ${numberChoice}`;
    headmain.before(instructions);
}
showInstructions(numberChoice, operatorChoice);

//אובייקט כרטיס
card = {
    code: -1,
    isOpen: false,
    cardNumber: -1,
    isExist: true,

    set cardNumber(number) {
        this._cardNumber = number;
    }
}

//הבנאי של הכרטיס
function Card(code, isOpen, cardNumber, isExist) {
    this.code = code;
    this.isOpen = isOpen;
    this.cardNumber = cardNumber;
    this.isExist = isExist;
}
let myStackCard = null;

//פונקציה היוצרת ומחזירה מספר רנדומלי
function randomNumber(numberChoice) {
    const min = 0;
    let max = numberChoice + 1;
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber;

}

//חיסור
function subPairs(numberChoice) {
    const sub = [];
    const randomIndex = randomNumber(sub.length - 1);
    let count = 0;
    for (let i = 1; i <= 80 && count < 10; i++) {
        const j = i + numberChoice;
        if (j <= 100 && j !== i && sub.indexOf(i) === -1 && sub.indexOf(j) === -1) {
            sub.push(j, i);
            count++;
        }
    }
    const randomIndexsub = randomNumber(sub.length - 1);
    return sub[randomIndexsub];
}

//חילוק
function divPairs(numberChoice) {
    const div = [];
    let count = 0;
    for (let i = 1; i <= 100 && count < 10; i++) {
        if (i % numberChoice === 0) {
            const factor1 = i;
            const factor2 = i / numberChoice;
            div.push(factor1, factor2);
            count++;
        }
    }
    const randomIndexDiv = randomNumber(div.length - 1);
    return div[randomIndexDiv];
}

//כפל
function getRandomDivisor(numberChoice) {
    let divisors = [];
    for (let i = 1; i <= numberChoice + 1; i++) {
        if (numberChoice % i === 0) {
            divisors.push(i);
        }
    }
    const randomIndex = randomNumber(divisors.length - 1);
    return divisors[randomIndex];
}

//פונקציה שיצרת מופע כרטיסים על המסך
function createCard() {
    let board = document.querySelector("main");//לוח המשחק
    let cardMatrix = [];//מטריצה ללוגיקת המשחק

    for (let i = 1; i <= 5; i++) {
        let row = document.createElement("div");//יצירת שורה בלוח המשחק
        row.className = "row";
        let cardRow = [];//יצירת שורה במטריצה

        for (let j = 1; j <= i; j++) {
            let isOpen = i === 5;//אם הכרטיס בשורה החמישית - הוא פתוח
            let card;
            //יצירת אובייקט כרטיס על פי האופרטור והסכום הנבחרים
            if (operatorChoice == "multiplication") { card = new Card(i * 10 + j, isOpen, getRandomDivisor(numberChoice), true); }
            if (operatorChoice == "addition") { card = new Card(i * 10 + j, isOpen, randomNumber(numberChoice), true); }
            if (operatorChoice === "subtraction") { card = new Card(i * 10 + j, isOpen, subPairs(numberChoice), true); }
            if (operatorChoice === "division") { card = new Card(i * 10 + j, isOpen, divPairs(numberChoice), true); }
            //יצירת כרטיס על פי מאפייני האובייקט
            let cardElem = document.createElement("div");
            cardElem.className = "backCard";
            cardElem.id = (i * 10 + j);
            cardElem.textContent = card.cardNumber;
            cardElem.addEventListener('click', onCardClick);
            row.append(cardElem);
            cardRow.push(card);
        }

        cardMatrix.push(cardRow);
        board.append(row);
    }
    return cardMatrix;
}

let cardMatrix = createCard();

let stackBack;

//הכנת הקופה
function createBackground() {
    stackBackArea = document.createElement("div");
    stackBackArea.className = "stackBackArea";
    stackBackArea.id = "stackBackArea";
    let main = document.querySelector("main");
    main.append(stackBackArea);
    stackBack = document.createElement("div");
    stackBack.className = "stackBack";
    stackBack.id = "stackBack";
    stackBackArea.append(stackBack);
}
createBackground();

function createStackCard() {
    if (operatorChoice == "addition") { myStackCard = new Card(888, true, randomNumber(numberChoice), true); }
    if (operatorChoice == "multiplication") { myStackCard = new Card(888, true, getRandomDivisor(numberChoice), true); }
    if (operatorChoice === "subtraction") { myStackCard = new Card(888, true, subPairs(numberChoice), true); }
    if (operatorChoice === "division") { myStackCard = new Card(888, true, divPairs(numberChoice), true); }
    let stackCard = document.createElement("div");
    stackCard.className = "backCard";
    stackCard.id = myStackCard.code;
    stackCard.textContent = myStackCard.cardNumber;
    stackCard.addEventListener('click', onCardClick);
    let body = document.querySelector("body");
    stackBack.append(stackCard);
}
createStackCard();

function createStackButton() {
    let stackButton = document.createElement("div");
    stackButton.className = "stackButton";
    stackButton.id = "stackButton";
    stackButton.textContent = "press";
    stackButton.addEventListener('click', stackUsing);
    let body = document.querySelector("body");
    stackBack.append(stackButton);
}

function stackUsing(e) {
    let stackAudio = new Audio("../sounds/stack.mp3");
    stackAudio.play();

    if (operatorChoice == "multiplication") { myStackCard.cardNumber = getRandomDivisor(numberChoice); }
    if (operatorChoice == "addition") { myStackCard.cardNumber = randomNumber(numberChoice); }
    if (operatorChoice === "subtraction") { myStackCard.cardNumber = subPairs(numberChoice); }
    if (operatorChoice === "division") { myStackCard.cardNumber = divPairs(numberChoice); }
    document.getElementById(myStackCard.code).textContent = myStackCard.cardNumber;

}
createStackButton();

//מתחילים לשחק:)
let openCards = [];
//הפונקציה מופעלת כאשר לוחצים על כרטיס
function onCardClick(e) {
    let pressAudio = new Audio("../sounds/on-press.mp3");
    pressAudio.play();
    let card = e.target;//הכרטיס שעליו לוחצים
    let cardObject = returnObject(card);
    if (cardObject.isOpen == false) {//אם אפשר לגשת לכרטיס
        let errorAudio = new Audio("../sounds/error.mp3");
        errorAudio.play();
    }
    else {
        openCards.push(card);
        if (openCards.length > 2)
            openCards.splice(0, openCards.length);
        if (openCards.length === 2) //אם יש שתי כרטיסים פתוחים
        //נבדוק אם הפעולה שעושים עליהם תקנית לכללי המשחק
        {
            let card1 = openCards[0];
            let card2 = openCards[1];
            let card1Object = returnObject(card1);
            let card2Object = returnObject(card2);

            if (checkResult(card1Object.cardNumber, card2Object.cardNumber, operatorChoice)) {//אם התוצאה נכונה
                if (whichObject(card1Object) === true) {
                    let successAudio = new Audio("../sounds/success.mp3");
                    successAudio.play();
                    card1.classList.add('hide');
                    card1Object.isExist = false;
                    changeStatus(card1Object);
                }
                else if (whichObject(card1Object) === false) {
                    //החלפת קלף בערימה
                    if (operatorChoice == "multiplication")
                        card1Object.cardNumber = getRandomDivisor(numberChoice);
                    if (operatorChoice == "addition")
                        card1Object.cardNumber = randomNumber(numberChoice);
                    if (operatorChoice == "division")
                        card1Object.cardNumber = divPairs(numberChoice);
                    if (operatorChoice == "subtraction")
                        card1Object.cardNumber = subPairs(numberChoice);
                    document.getElementById(card1Object.code).textContent = card1Object.cardNumber;
                }
                if (whichObject(card2Object) === true) {
                    card2.classList.add('hide');
                    card2Object.isExist = false;
                    changeStatus(card2Object);
                }
                else if (whichObject(card2Object) === false) {
                    if (operatorChoice == "multiplication")
                        card2Object.cardNumber = getRandomDivisor(numberChoice);
                    if (operatorChoice == "addition")
                        card2Object.cardNumber = randomNumber(numberChoice);
                    if (operatorChoice == "division")
                        card2Object.cardNumber = divPairs(numberChoice);
                    if (operatorChoice == "subtraction")
                        card2Object.cardNumber = subPairs(numberChoice);
                    document.getElementById(card2Object.code).textContent = card2Object.cardNumber
                }
                openCards.splice(0, 2);//מרוקן את המערך
            }
            //אם החישוב לא נכון
            else {
                tries++;
                let failureAudio = new Audio("../sounds/failure.mp3");
                failureAudio.play();
                openCards.splice(0, 2);
            }
        }


    }
}

//מחזיר את האובייקט של הכרטיס המתקבל
function returnObject(anyCard) {
    let id = anyCard.id;
    if (id == 888)
        return myStackCard;
    else
        return cardMatrix[Math.floor(id / 10) - 1][id % 10 - 1];
}

//כאשר מנצחים
function win() {
    //הצגת החלונית הקופצת
    const popup = document.getElementById("popup");
    const triesSpan = document.getElementById("tries");
    const timeSpan = document.getElementById("time");
    triesSpan.innerHTML = tries;
    timeSpan.innerHTML = (new Date() - startTime) / 1000;
    popup.style.display = "block";

    //העלמת הדברים שברקע
    instructions.classList.add('hide');
    stackBackArea.classList.add('hide');
}

//אם האובייקט מהפירמידה - יחזיר נכון, אם מהערמה יחזיר לא נכון
function whichObject(anyCard) {
    if (anyCard.code === 888)
        return false;
    else
        return true;
}

//על כל קלף שנעלם - בודקת אם ניתן לפתוח קלפים נוספים
function changeStatus(anyCard) {
    let code = anyCard.code;
    let i = Math.floor(code / 10) - 1;
    let j = code % 10 - 1;
    if (i == 0 && j == 0)//הגעת לכרטיס האחרון - ניצחת
    {
        win();
    }
    //אחרי שהקלף נעלםת פותח את הקלפים האפשריים
    if (cardMatrix[i][j + 1] != undefined && cardMatrix[i][j + 1].isExist == false)
        cardMatrix[i - 1][j].isOpen = true;
    if (j > 0 && cardMatrix[i][j - 1].isExist == false)
        cardMatrix[i - 1][j - 1].isOpen = true;
}

function checkResult(num1, num2, operator) {
    if (num1 < num2) {
        let tmp = num1;
        num1 = num2;
        num2 = tmp;
    }
    let result;
    switch (operator) {
        case "addition":
            result = num1 + num2;
            break;
        case "subtraction":
            result = num1 - num2;
            break;
        case "multiplication":
            result = num1 * num2;
            break;
        case "division":
            result = num1 / num2;
            break;
    }
    return result === numberChoice ? true : false;
}




