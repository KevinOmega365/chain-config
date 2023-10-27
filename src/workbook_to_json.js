import * as XLSX from 'xlsx'

const workbookToJson = (workbook) =>
{
    const workbookJson = {}

    workbook.SheetNames.map(sheetName =>
    {
        const worksheet = workbook.Sheets[sheetName]
        workbookJson[sheetName] = 
            XLSX.utils.sheet_to_json(worksheet, {header: 'A'})
    })

    return workbookJson
}

export default workbookToJson