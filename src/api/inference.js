import axios from "axios"
import {getConfigStore} from "@/store"

const TOKEN = "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"
const ENDPOINT = "https://api-inference.huggingface.co/models"


export default function postInference(text, persona) {
    return axios
        .post(
            `${ENDPOINT}/${getConfigStore().model}`,
            {
                "inputs": fillPrompt(text, persona),
                "parameters": {
                    "return_full_text": false,
                    "max_new_tokens": 200,
                }

            },
            {headers: {Authorization: `Bearer ${TOKEN}`}}
        )
        .then(response => response.data[0].generated_text)
        .catch(error => error.toString())
}

function fillPrompt(text, persona) {
    return getConfigStore().prompt
        .replace('{text}', text)
        .replace('{persona}', persona)
}