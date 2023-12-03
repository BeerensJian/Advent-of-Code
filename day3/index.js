import { readFileSync } from "node:fs"

const data = readFileSync("./input.txt", "utf-8")
const lines = data.split("\r\n")
const specialCharacters = ['/', '@', "#", '+', '-', '=', '$', '%', '&', '*']


let lineNumbersWithIndexes = []
for (let i = 0; i < lines.length; i++) {
    let previousLine = lines[i - 1]
    let nextLine = lines[i + 1]
    const line = lines[i]


    let numbers = []
    let numberInstance = ''
    let numberNextToSymbol = false
    let lineLength = line.length;
    for (let y in line) {

        if (isNaN(Number(line[y]))) {
            if (numberInstance != '') numbers.push({ number: numberInstance, numberNextToSymbol: numberNextToSymbol })

            numberNextToSymbol = false
            numberInstance = ''
            continue
        }

        if (specialCharacters.includes(line[parseInt(y) + 1])) numberNextToSymbol = true
        if (specialCharacters.includes(line[parseInt(y) - 1])) numberNextToSymbol = true
        if (previousLine) {
            if (specialCharacters.includes(previousLine[parseInt(y)])) numberNextToSymbol = true
            if (specialCharacters.includes(previousLine[parseInt(y) + 1])) numberNextToSymbol = true
            if (specialCharacters.includes(previousLine[parseInt(y) - 1])) numberNextToSymbol = true
        }
        if (nextLine) {
            if (specialCharacters.includes(nextLine[parseInt(y)])) numberNextToSymbol = true
            if (specialCharacters.includes(nextLine[parseInt(y) + 1])) numberNextToSymbol = true
            if (specialCharacters.includes(nextLine[parseInt(y) - 1])) numberNextToSymbol = true
        }

        numberInstance = numberInstance + line[y]

        if (parseInt(y) === (lineLength - 1)) {
            if (numberInstance != '') numbers.push({ number: numberInstance, numberNextToSymbol: numberNextToSymbol })
        }
    }

    lineNumbersWithIndexes.push(numbers)
}




let sumOfParts = 0;
lineNumbersWithIndexes.forEach((line) => {
    let totalOfLine = 0;
    line.forEach((number) => {
        if (number.numberNextToSymbol) {
            totalOfLine += parseInt(number.number);
        }
    })
    sumOfParts += totalOfLine;
})

console.log(sumOfParts)


