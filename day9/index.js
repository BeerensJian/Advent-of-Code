import { readFileSync } from 'node:fs'

const data = readFileSync('./input.txt', 'utf-8')
const histories = data.split("\r\n").map(history => history.split(" ").map(value => parseInt(value)))
const reversedHistories = JSON.parse(JSON.stringify(histories));
for (const history of reversedHistories) {
    history.reverse()
}

let sumOfNextValues = 0
for (const history of histories) {
    const nextValue = find_next_value(history)
    sumOfNextValues += nextValue
}
console.log("part1 " + sumOfNextValues)

sumOfNextValues = 0
for (const history of reversedHistories) {
    const nextValue = find_next_value(history)
    sumOfNextValues += nextValue
}
console.log("part2 " + sumOfNextValues)


function find_next_value(history) {
    let sequences = [history]

    while (!sequence_of_zeros(sequences.at(-1))) {
        
        let new_sequence = []
        for (let i = 0; i < sequences.at(-1).length; i++ ) {
            const currentValue = sequences.at(-1)[i]
            const nextValue = sequences.at(-1)[i + 1]
            if (nextValue !== undefined) {
                new_sequence.push(nextValue - currentValue)
            }
            
        }
        sequences.push(new_sequence)
    }

    for (let i = sequences.length - 1; i >= 0; i--) {
        const previousSequence = sequences[i + 1]
        if (!previousSequence) {
            sequences[i].push(0)
            continue
        }
        const currentSequence = sequences[i]
        const nextValue = currentSequence.at(-1) + previousSequence.at(-1)
        currentSequence.push(nextValue)
    }


    return sequences[0].at(-1)
}

function sequence_of_zeros(sequence) {
    //determine if all of the values are zero's
    for (const value of sequence) {
        if (value !== 0) return false
    }
    return true
}