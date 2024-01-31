// //var video = document.getElementById("myVideo");
// card = {
//     code: -1,
//     isOpen: false,
//     cardNumber: -1,
//     isExis

//     set cardNumber(number) {
//         this._cardNumber = number;
//     }
// }

// function Card(code, isOpen, cardNumber) {//הבנאי של הכרטיס
//     this.code = code;
//     this.isOpen = isOpen;
//     this.cardNumber = cardNumber;
// }

// let myStackCard = null;

// function randomNumber(numberChoice) {
//     const min = 1;
//     let max = numberChoice;
//     let randomNumber = Math.floor(Math.random() * (max - min) + min);
//     return randomNumber;

// }

// //פונקציה שיצרת מופע כרטיסים על המסך
// function createCard() {
//     const numberChoice = 13;

//     let board = document.querySelector("main");
//     let cardMatrix = [];

//     for (let i = 1; i <= 5; i++) {
//         let row = document.createElement("div");
//         row.className = "row";
//         let cardRow = [];

//         for (let j = 1; j <= i; j++) {
//             let isOpen = i === 5;
//             let card = new Card(i * 10 + j, isOpen, randomNumber(numberChoice));
//             let cardElem = document.createElement("div");
//             cardElem.className = "backCard";
//             cardElem.id = (i * 10 + j);
//             cardElem.textContent = card.cardNumber;
//             cardElem.addEventListener('click', onCardClick);
//             row.append(cardElem);

//             cardRow.push(card);
//         }

//         cardMatrix.push(cardRow);
//         board.append(row);
//     }
//     console.log(cardMatrix);


// }

// let cardMatrix = createCard();
// // function onCardClick(e) {
// //     let card1 = e.target;
// //     console.log(card1);

// // }

// let stackBack;

// function createBackground() {
//     stackBack = document.createElement("div");
//     stackBack.className = "stackBack";
//     stackBack.id = "stackBack";
//     let body = document.querySelector("body");
//     body.after(stackBack);
// }
// createBackground();

// function createStackCard() {
//     let numberChoice = 13;
//     myStackCard = new Card(888, true, randomNumber(numberChoice));
//     let stackCard = document.createElement("div");
//     stackCard.className = "backCard";
//     stackCard.id = myStackCard.code;
//     stackCard.textContent = myStackCard.cardNumber;
//     stackCard.addEventListener('click', onCardClick);
//     let body = document.querySelector("body");
//     stackBack.append(stackCard);
// }
// createStackCard();

// function createStackButton() {
//     let stackButton = document.createElement("div");
//     stackButton.className = "stackButton";
//     stackButton.id = "stackButton";
//     stackButton.textContent = "press";
//     stackButton.addEventListener('click', stackUsing);
//     let body = document.querySelector("body");
//     stackBack.append(stackButton);
// }

// function stackUsing(e) {
//     myStackCard.cardNumber = randomNumber(13);
//     document.getElementById(myStackCard.code).textContent = myStackCard.cardNumber;
// }

// createStackButton();

// let openCards = [];
// function onCardClick(e) {
//     let card = e.target;//הכרטיס שעליו לוחצים
//     if (card.isOpen == false)
//         alert("you can not press this card");
//     else {
//         openCards.push(card);
//         if (openCards.length === 2) //אם יש שתי כרטיסים פתוחים
//         //נבדוק אם הפעולה שעושים עליהם תקנית לכללי המשחק
//         {
//             let card1 = openCards[0];
//             let card2 = openCards[1];
//             if(card1.cardNumber+card2.cardNumber===13)
//             {
//                 card1.remove();
//                 card2.remove();
//                 openCards.splice(0,2);
//                 delete openCards[0];
//                 delete openCards[1];
//                 card1.isOpen=false;
//                 card2.isOpen=false;

//             }
//         }


//     }
// }







// localStorage.setItem("teacherData", JSON.stringify
//             ({ Fname: teacherFname,Lname:teacherLname, ID: teacherID, 
//                 Email: teacherEmail,code:teacherCode,
//                  operator: "+", sum: "13", withTimer: "false" }))
//         teacherArr.push(teacherData);