import { readFileSync } from 'node:fs'

const data = readFileSync('./input.txt', 'utf-8')
const hands = data.split("\r\n").map((hand) => {
    hand = hand.split(" ")
    const cards = hand[0].split("")
    return [cards, parseInt(hand[1])]
})
const cardLabels = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const types = {
    high_card : 1,
    one_pair : 2,
    two_pair : 3,
    three_of_a_kind : 4,
    full_house : 5,
    four_of_a_kind : 6,
    five_of_a_kind : 7
}

const handsWithType = hands.map(hand => {
    const [cards, bid] = hand
    const type = determineType(cards, cardLabels)
    return [cards, bid, type]
}).sort((a, b) => {
    //sort first by type
    if (a[2] < b[2]) return -1
    if (a[2] > b[2]) return 1
    // sort by card value
    for (let i = 0; i < a[0].length; i++ ) {
        const cardA = a[0][i]
        if (getCardValue(cardA) < getCardValue(b[0][i])) return -1
        if (getCardValue(cardA) > getCardValue(b[0][i])) return 1
    }
    return 0
})

let totalWinning = 0
for (let i = 0; i < handsWithType.length ; i++) {
    const rank = i + 1
    const hand = handsWithType[i]
    totalWinning += hand[1] * rank
}


console.log(totalWinning)

function determineType(cards, cardLabels) {
    // for each card of the hand determine how many of each card
    const cardLabelMap = {}
    for (const cardLabel of cardLabels) {
        cardLabelMap[cardLabel] = 0
    }
    
    for(const card of cards) {
        for (const entry of Object.entries(cardLabelMap)) {
            if (card === entry[0]) {
                cardLabelMap[card]++
            }
        }
    }

    const labelAmounts = Object.entries(cardLabelMap).filter(entry => entry[1] != 0)
    let pairs = []
    let triplets = []
    for (let i = 0; i < labelAmounts.length; i++) {
        const labelAmount = labelAmounts[i] 
        if (labelAmount[1] === 5) return types.five_of_a_kind
        if (labelAmount[1] === 4) return types.four_of_a_kind
        if (labelAmount[1] === 3) triplets.push(labelAmount[0])
        if (labelAmount[1] === 2) pairs.push(labelAmount[0])
    }
    if (pairs.length === 1 && triplets.length === 1) return types.full_house
    if (triplets.length === 1) return types.three_of_a_kind
    if (pairs.length === 2) return types.two_pair
    if (pairs.length === 1) return types.one_pair
    return types.high_card
}

function getCardValue(card) {
    switch (card) {
        case '2': return 2;
        case '3': return 3;
        case '4': return 4;
        case '5': return 5;
        case '6': return 6;
        case '7': return 7;
        case '8': return 8;
        case '9': return 9;
        case 'T': return 10;
        case 'J': return 11;
        case 'Q': return 12;
        case 'K': return 13;
        case 'A': return 14;
        default: 
            console.log('Error: Unknown card ' + card);
            return -1;
    }
}



//sort function should return negative if the first value is less then the second, 0 if equal, 1 if more




// foreach hand determine the type
// rank the hands based on the type
// if the hands have the same type then compare the value of the first card
// if the first card is the same, compare second card and so on
// give all the cards a rank the lowest has rank is rank 1, highest rank (totalAmountOfHands)
// multiply each hands bid by their rank and sum em all up
