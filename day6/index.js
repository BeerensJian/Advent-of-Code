import { readFileSync } from 'node:fs'

const data = readFileSync('./input.txt', 'utf-8')
const lines = data.split('\r\n')
                    .map((line) => line.split(':')[1].trim().split(" ").filter((value) => value != '').map(value => parseInt(value)))

const [timeValues, distanceRecords] = lines
const totalTime = timeValues.reduce((accummulator, currentValue) => accummulator + currentValue, '')
const distanceToBeat = distanceRecords.reduce((accummulator, currentValue) => accummulator + currentValue, '')
const part2DistancePair = [totalTime, distanceToBeat]
const timeDistancePairs = timeValues.map((value, index) => [value, distanceRecords[index]])

//part 1 : foreach pair find how many ways to beat record
let solutionAmountPerPair = []
for (const pair of timeDistancePairs) {
    const solutions = findWaysToBeatRecord(pair)
    solutionAmountPerPair.push(solutions)
}
//part1
console.log(MultiplyWaysToSolve(solutionAmountPerPair))
//part 2
console.log(findWaysToBeatRecord(part2DistancePair))


function findWaysToBeatRecord(pair){
    const [time, distanceRecord] = pair
    let recordBeatingDistances = []
    for (let i = 0; i != time; i++) {
        const chargingtime = i
        const distanceTravelled = chargingtime * (time - chargingtime)
        if (distanceTravelled > distanceRecord) {
            recordBeatingDistances.push(distanceTravelled)
        }
    }
    return recordBeatingDistances.length
}

function MultiplyWaysToSolve(solutionAmountPerPair) {
    return solutionAmountPerPair.reduce((accumulator, currentValue) => {
        if (accumulator === 0) {
            return 1 * currentValue
        }
        return accumulator * currentValue
    }, 0
    )
}



