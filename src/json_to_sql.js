const tableName = 'ltbl_Import_Mapping_ProArcChains'

const columns = [
    { name: 'GroupRef', type: 'string' },
    { name: 'Domain', type: 'string' },
    { name: 'Chain', type: 'string' },
    { name: 'ReasonForIssue', type: 'string' },
    { name: 'Description', type: 'string' },
    { name: 'DefaultStep', type: 'string' },
    { name: 'PriorityTwoStep', type: 'string' },
    { name: 'PriorityOneStep', type: 'string' },
    { name: 'CumulativeProgress', type: 'number' },
    { name: 'StepProgress', type: 'number' }
]

const objectToSqlValuesTuple = (o) =>
    `(${
        columns
        .map(c => (c.type === 'string' ? "'" + o[c.name] + "'" : o[c.name]) ?? "NULL")
        .join(', ')
    })`

const jsonToSqlInsert = (jsonRecords) =>
{
    let sql = ''

    sql += `insert into dbo.${tableName}\n`

    sql += `(\n    ${columns.map(c => c.name).join(',\n    ')}\n)\n`

    sql += 'values\n'

    sql += '    ' + jsonRecords.map(objectToSqlValuesTuple).join(',\n    ')

    return sql
}

export default jsonToSqlInsert