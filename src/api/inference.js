import axios from "axios"

const setup = {
    "api": {
        "bearer_token": "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",
        "endpoint": "https://api-inference.huggingface.co/models"
    },
    "config": {
        "model": "tiiuae/falcon-7b-instruct",
        "prompt": "Reply in the form of a tweet to the following text {persona}: '''{text}'''"
    }
}

export default function get_inference(text, persona) {
    return axios
        .post(
            `${setup.api.endpoint}/${setup.config.model}`,
            {
                "inputs": fill_prompt(text, persona),
                "parameters": {
                    "return_full_text": false,
                    "max_new_tokens": 200,
                }

            },
            {headers: {Authorization: `Bearer ${setup.api.bearer_token}`}}
        )
        .then(response => response.data[0].generated_text)
        .catch(error => error.toString())
}

function fill_prompt(text, persona) {
    return setup.config.prompt
        .replace('{text}', text)
        .replace('{persona}', persona)
}

export {setup as inference_setup}
