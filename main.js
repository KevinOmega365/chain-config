import * as XLSX from 'xlsx'
import * as fs from 'fs'
import { Readable } from 'stream'

import workbookToJson from './src/workbook_to_json.js'
import reshapeJson from './src/reshape_json.js'
import jsonToSqlInsert from './src/json_to_sql.js'

XLSX.set_fs(fs)
XLSX.stream.set_readable(Readable)

const main = () =>
{
    const file_path = process.argv[2]

    if(file_path)
    {
        const wb = XLSX.readFile(file_path)
    
        const chainsRaw = workbookToJson(wb)
    
        fs.writeFileSync(
            './workspace/chainsRaw.json',
            JSON.stringify(chainsRaw, null, 4)
        )
        
        const chainsReshaped = reshapeJson(chainsRaw)
        
        fs.writeFileSync(
            './workspace/chainsReshaped.json',
            JSON.stringify(chainsReshaped, null, 4)
        )

        const sql = jsonToSqlInsert(chainsReshaped)

        fs.writeFileSync('./output/insertChains.sql', sql)

        console.log('ok.')
    }
    else
    {
        console.log('The expected command format is "npm run parse YOUR_FILE_NAME_HERE"')
    }
}

main()
