import {v4 as uuid} from 'uuid'
import {saveAs} from "file-saver"

export function download_json(data, label = 'records') {
    saveAs(
        new Blob(
            [JSON.stringify(data)],
            {type: 'application/json'}
        ),
        label + '.' + uuid() + '.json'
    )
}