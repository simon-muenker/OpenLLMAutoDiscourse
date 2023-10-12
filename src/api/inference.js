import axios from "axios"

const TOKEN = "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"
const ENDPOINT = "https://api-inference.huggingface.co/models"

let config = {
    "model": "tiiuae/falcon-7b-instruct",
    "prompt": "Reply in the form of a tweet to the following text {persona}: '''{text}'''"
}

export default function get_inference(text, persona) {
    return axios
        .post(
            `${ENDPOINT}/${config.model}`,
            {
                "inputs": fill_prompt(text, persona),
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

function fill_prompt(text, persona) {
    return config.prompt
        .replace('{text}', text)
        .replace('{persona}', persona)
}

export {config as inferenceConfig}
