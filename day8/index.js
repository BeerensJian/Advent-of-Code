import { readFileSync } from 'node:fs'

const data = readFileSync('./input.txt', 'utf-8')
const lines = data.split("\r\n")
const instuctions = lines[0].split("")
const nodes = lines.slice(2).map(node => {
    let [nodeName, instructions] = node.split("=")
    nodeName = nodeName.trim()
    instructions = instructions.trim().replace(/\(|\)/g, "").split(", ")
    return { nodeName , instructions }
})

// find starting node
let currentIndex = 0
for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (node.nodeName === 'AAA') currentIndex = i
}

let currentNode = nodes[currentIndex]
let steps = 0
let currentInstructionIndex = 0
while (currentNode.nodeName !== "ZZZ") {
    const currentInstuction = instuctions[currentInstructionIndex] // either 'R' or 'L'

    const nextNodeName = currentNode.instructions[getInstuctionValue(currentInstuction)]
    // find the index of the next node
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.nodeName === nextNodeName ) currentNode = nodes[i]
    }

    steps++
    currentInstructionIndex++
    if (currentInstructionIndex === instuctions.length) currentInstructionIndex = 0
}

console.log(steps)


function getInstuctionValue(value) {
    switch(value){
        case "R":
            return 1
        case "L":
            return 0
        default:
            console.error("Not a instruction: " + value)
    }   
}


