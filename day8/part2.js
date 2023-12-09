import { readFileSync } from 'node:fs'

const data = readFileSync('./input.txt', 'utf-8')
const lines = data.split("\r\n")
const instuctions = lines[0].split("")
const node_map = parse_input(lines)
const starting_nodes = Object.entries(node_map).filter(node => node[0].endsWith('A'))
const ending




function parse_input(lines) {
    const data_map = {}
    lines.slice(2).forEach(node => {
        let [nodeName, instructions] = node.split("=")
        nodeName = nodeName.trim()
        instructions = instructions.trim().replace(/\(|\)/g, "").split(", ")
        data_map[nodeName] = instructions
    })

    return data_map
}

