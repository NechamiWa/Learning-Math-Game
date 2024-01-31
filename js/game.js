function returnObject(anyCard) {
    let id = anyCard.id;
    if (id == 888)
        return myStackCard;
    else
        return cardMatrix[Math.floor(id / 10) - 1][id % 10 - 1];
}



let id1 = card1.id;
let id2 = card2.id;
let place1 = cardMatrix[Math.floor(id1 / 10) - 1][id1 % 10 - 1];
let place2 = cardMatrix[Math.floor(id2 / 10) - 1][id2 % 10 - 1];