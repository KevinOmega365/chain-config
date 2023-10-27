
// const IvarAasen = 'cdfac83e-cc06-424d-9997-b38bb8a8cd7e'
const Munin = '93e48b03-aa47-48d8-90f1-9787332f8047'
const Noaka = '5efd7e52-e187-491c-a9cc-1f8f97eebb70'
const NcpKl = '8770e32a-670b-499e-bb64-586b147019be'

const sheetNameMapping = {
    'Fenris (King Lear)': {
        groupRef: NcpKl,
        domain: '153'
    },
    'Hugin B (NOA Frøy)': {
        groupRef: Noaka,
        domain: '187'
    },
    'Hugin A(NOA PdQ)': {
        groupRef: Noaka,
        domain: '128'
    },
    'PWP Valhall': {
        groupRef: NcpKl,
        domain: '145'
    },
    'Munin': {
        groupRef: Munin,
        domain: '175'
    }
}

const headerMapping = {
    A: 'Chain',
    B: 'Milestone',
    C: 'Description',
    D: 'Pims DCS',
    E: 'Interface contract for review',
    F: 'Safety Critical ',
    G: 'Cumulative progress %',
    H: 'Step Progress %'
}

const columnMapping = {
    'Chain': 'Chain',
    'Milestone': 'ReasonForIssue',
    'Description': 'Description',
    'Pims DCS': 'Default',
    'Interface contract for review': 'PriorityTwo',
    'Safety Critical ': 'PriorityOne',
    'Cumulative progress %': 'CumulativeProgress',
    'Step Progress %': 'StepProgress'
}

const reshapeJson = (raw) =>
{
    const scratch = JSON.parse(JSON.stringify(raw)) // this is bad habit, but it makes the function pure

    const reshaped = []

    for(const sheetName of Object.keys(scratch))
    {
        let prevChain;
        // skip the header rows
        for(let i = 2; i < scratch[sheetName].length; i++)
        {
            const row = scratch[sheetName][i]

            if(row.A === undefined)
            {
                row.A = prevChain
            }
            prevChain = row.A

            reshaped.push({
                GroupRef: sheetNameMapping[sheetName].groupRef,
                Domain: sheetNameMapping[sheetName].domain,
                ... Object.fromEntries(
                    Object.entries(row).map(([key, value]) =>
                    [
                        columnMapping[headerMapping[key]],
                        value
                    ])
                )
            })
        }

    }

    return reshaped
}

export default reshapeJson