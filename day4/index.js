import { readFileSync } from 'node:fs';

const data = readFileSync('./input.txt', 'utf-8');
const cards = data.split('\r\n').map((card, i) => {
    let cardLists = card.split(':')[1].split('|');
    cardLists = cardLists.map(list => list.trim().split(" "))
    const listPair = []
    cardLists.forEach((list) => {
        const cleanList = list.filter((item) => item != '').map((item) => parseInt(item))
        listPair.push(cleanList)
    })
    
    const winningNumbers = listPair[0]
    const myNumbers = listPair[1]


    let points = 0
    let wonNumbers = 0
    winningNumbers.forEach((number) => {
        if (myNumbers.includes(number)) {
            points === 0 ? points++ : points += points
            wonNumbers++
        }
    })
    return { card: i + 1, wonAmount: wonNumbers, points, instances: 1}
});

//part1 solution
console.log(cards.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0))

let part2 = []
for(let i = 0; i < cards.length; i++) {
    const card = cards[i]
    for(let x = 0; x < card.instances; x++) {
        for(let y = 0; y < card.wonAmount; y++) {
            if (cards[i + (y + 1)]) {
                cards[i + (y + 1)].instances++
            }
        }
    }
    part2.push(card)
}

console.log(part2.reduce((accumulator, currentValue) => accumulator + currentValue.instances, 0))
