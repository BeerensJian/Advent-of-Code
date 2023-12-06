import { readFileSync } from 'node:fs';

const almanac = readFileSync('./input.txt', 'utf-8');
const lines = almanac.split("\r\n").filter((line) => line != '')
const seeds = lines[0].split(':')[1].trim().split(' ').map((seed) => parseInt(seed))

const mapOfMaps = { }
let mapNames = []

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    let mapKey = ''
    if (line.includes('map')) {
        mapKey = line.split(' ')[0]
        mapNames.push(mapKey)
        let mappingValues = []
        let y = 1
        while(lines[i + y] !== undefined && !lines[i + y].includes('map')) {
            mappingValues.push(lines[i + y].split(" ").map((number) => parseInt(number)))
            y++
        }
        mapOfMaps[mapKey] = mappingValues
    }
}


const seedsValuesList = seeds.map(seed => {
    let seedValues = [seed]

    for (let x = 0; x < mapNames.length; x++) {
        const currentmap = mapNames[x]
        let found = false;
        mapOfMaps[currentmap].forEach(possibility => {
            const [destinationStart, sourceStart, range] = possibility
            if (found) return
            for (let i = 0; i < range; i++) {
                if (found) break
                if (sourceStart + i === seedValues[seedValues.length - 1]) {
                    seedValues.push(destinationStart + i)
                    found = true
                    break
                }
                
            }
        });
    
        if (seedValues.length < x + 2) {
            seedValues.push(seedValues[x])
        }
    }
    return seedValues
}) 

const ListOfLocations = seedsValuesList.map((seedValues) => seedValues[seedValues.length - 1])
console.log(Math.min(...ListOfLocations))