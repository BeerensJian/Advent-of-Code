import { readFileSync } from 'node:fs';
import { BigMap } from './BigMap.js';

const almanac = readFileSync('./input.txt', 'utf-8');
const lines = almanac.split("\r\n").filter((line) => line != '')
const seeds = lines[0].split(':')[1].trim().split(' ').map((seed) => parseInt(seed))

const mapOfMaps = new Map();
let mapNames = []

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    let mapKey = ''
    if (line.includes('map')) {
        mapKey = line.split(' ')[0]
        mapNames.push(mapKey)
        let conversionMap = {}
        let y = 1
        while(lines[i + y] !== undefined && !lines[i + y].includes('map')) {
            ConvertStringToMap(lines[i + y], conversionMap)
            y++
        }
        mapOfMaps.set(mapKey, conversionMap)
    }
}


const valuesForSeeds = []
seeds.forEach(seed => {
    const valuesForSeed = [seed]
    // convert each seed to its final location value
    // for each map convert to value to the next one and add it to array for single seed
    mapNames.forEach(mapName => {
        const currentMap = mapOfMaps.get(mapName)
        const lastValue = valuesForSeed[valuesForSeed.length - 1]
        if (currentMap[lastValue]) {
            valuesForSeed.push(currentMap[lastValue])
        } else {
            valuesForSeed.push(lastValue)
        }
    })
    valuesForSeeds.push(valuesForSeed)
})

//part1
const lowestLocation = Math.min(...valuesForSeeds.map((seedValues) => seedValues[seedValues.length - 1]))
console.log(valuesForSeeds)
console.log(lowestLocation)




function ConvertStringToMap(ConversionString, myMap) {
    const [destStart, sourceStart, range] = ConversionString.split(' ').map(number => parseInt(number))
    for (let i = 0; i < range; i++) {
        const sourceNumber = sourceStart + i
        const destinationNumber = destStart + i
        myMap[sourceNumber] = destinationNumber
    }
}

