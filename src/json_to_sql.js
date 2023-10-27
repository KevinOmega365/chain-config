import fs from 'fs'

const chainsJson = JSON.parse(fs.readFileSync('./chains.json'))

const keyCounts = {}
const valueCounts = {}
const keyValueCounts = {}

for(const sheetName in chainsJson)
{
    if(chainsJson[sheetName][1])
    {
        for(const [col, header] of Object.entries(chainsJson[sheetName][1]))
        {
            keyCounts[col] = keyCounts[col] ? keyCounts[col] + 1 : 1
            valueCounts[header] = valueCounts[header] ? valueCounts[header] + 1 : 1
            keyValueCounts[col + header] = keyValueCounts[col + header] ? keyValueCounts[col + header] + 1 : 1
        }
    }
}

console.log(keyCounts)
console.log(valueCounts)

// console.log(Object.keys(chainsJson))