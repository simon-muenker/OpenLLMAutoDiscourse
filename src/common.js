import {v4 as uuid} from 'uuid'
import {saveAs} from "file-saver"

export function downloadJSON(data, label = 'records') {
    saveAs(
        new Blob(
            [JSON.stringify(data)],
            {type: 'application/json'}
        ),
        label + '.' + uuid() + '.json'
    )
}


export async function uploadJSON(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = event => resolve(JSON.parse(event.target.result))
        fileReader.onerror = error => reject(error)
        fileReader.readAsText(file)
    })
}