import OpenAI from 'openai'
import {textGeneration} from '@huggingface/inference'
import {getConfigStore} from "@/stores/config"


export function hfInference(prompt) {
    return textGeneration({
        accessToken: getConfigStore().integration.token,
        model: getConfigStore().integration.model,
        inputs: prompt,
        parameters: {
            return_full_text: false,
            max_new_tokens: 255
        }
    })
        .then(response => response.generated_text)
        .catch(error => error.toString())
}

export function GPTInference(prompt) {
    return new OpenAI({
        apiKey: getConfigStore().integration.token,
        dangerouslyAllowBrowser: true
    }).chat.completions.create({
        messages: [{role: 'user', content: prompt}],
        model: getConfigStore().integration.model,
    })
        .then(response => response.choices[0].message.content)
        .catch(error => error.toString())
}

