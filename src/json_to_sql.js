const tableName = 'ltbl_Import_Mapping_ProArcChains'

const objectToSqlValuesTuple = (o) =>
    `(${
        Object.values(o)
        .map(v => typeof v === 'string' ? "'" + v + "'" : v)
        .join(', ')
    })`


const jsonToSqlInsert = (jsonRecords) =>
{
    let sql = ''

    sql += `insert into ${tableName}\n`

    sql += `(\n    ${Object.keys(jsonRecords[0]).join(',\n    ')}\n)\n`

    sql += 'values\n'

    sql += '    ' + jsonRecords.map(objectToSqlValuesTuple).join(',\n    ')

    return sql
}

export default jsonToSqlInsert