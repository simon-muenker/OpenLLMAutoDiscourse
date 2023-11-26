import OpenAI from 'openai'
import {textGeneration} from '@huggingface/inference'
import {getConfigStore} from "@/stores/config"

const openai_TOKEN = "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"

export function hfInference(text, persona) {
    return textGeneration({
        accessToken: getConfigStore().integration.token,
        model: getConfigStore().integration.model,
        inputs: fillPrompt(text, persona),
        parameters: {
            return_full_text: false,
            max_new_tokens: 255
        }
    })
        .then(response => response.generated_text)
        .catch(error => error.toString())
}

export function GPTInference(text, persona) {
    return new OpenAI({
        apiKey: getConfigStore().integration.token,
        dangerouslyAllowBrowser: true
    }).chat.completions.create({
        messages: [{role: 'user', content: fillPrompt(text, persona)}],
        model: getConfigStore().integration.model,
    })
        .then(response => response.choices[0].message.content)
        .catch(error => error.toString())
}

function fillPrompt(text, persona) {
    return getConfigStore().prompt
        .replace('{text}', text.trim())
        .replace('{persona}', persona.trim())
}