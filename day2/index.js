import { readFileSync } from "node:fs"

const data = readFileSync("./input.txt", "utf-8");
const games = data.split("\r\n")

const totalCubes = Object.freeze({
    "red": 12,
    "green": 13,
    "blue": 14
})


const gamesResults = games.map((game) => {

    const [gameString, rounds] = game.split(':')
    const gameId = parseInt(gameString.split(" ")[1]);
    const arrayOfRounds = rounds.split(";")

    const lowestAmountPerColor = {
        'blue' : 0,
        'red' : 0,
        'green' : 0
    }


    let gameResult = []
    for (let round of arrayOfRounds) {
        const entries = round.split(",").map((grab) => {
            const [amount, color] = grab.trim().split(" ")
            return { color : color, amount : parseInt(amount) }
        })
        gameResult = [...gameResult, ...entries]
    }

    for (let entry of gameResult) {
        if (lowestAmountPerColor[entry.color] < entry.amount) {
            lowestAmountPerColor[entry.color] = entry.amount
        }
    }

    for(let entry of gameResult) {
        const { color, amount } = entry;
        const totalAmount = totalCubes[color]

        if (amount > totalAmount) {
            return [gameId, false, lowestAmountPerColor]
        }
    }

    return [gameId, true, lowestAmountPerColor]
})


//part1
const SumOfPossibleIds = gamesResults.reduce((accumulator, currentValue) => {
    if (currentValue[1]) {
        return accumulator + currentValue[0]
    }
    return accumulator + 0
}, 0)
console.log("part1 " + SumOfPossibleIds)

//part2
const sumOfPowers = gamesResults.reduce((accumulator, currentValue) => {
    let multiplication = 1
    for (const [key, value] of Object.entries(currentValue[2])){
        multiplication = multiplication * value
    }
    return accumulator + multiplication
}, 0)

console.log("part2 " + sumOfPowers)







// store the lowest values for each color for the game to be possible
//