import {defineStore} from "pinia"
import {getDefaultPrompt, getIntegrations} from "@/data/config"

export const getConfigStore = defineStore('config', {
    state: () => ({
        integration: getIntegrations().huggingFace,
        prompt: getDefaultPrompt()
    }),
    getters: {
        getConfig: (state) => ({
            "integration": state.integration,
            "prompt": state.prompt
        }),
        getIntegration: (state) => state.integration,
        getPrompt: (state) => state.prompt,
    },
    actions: {
        changeIntegration(provider) {
            this.integration = getIntegrations()[provider]
        },
        setIntegrationToken(token) {
            this.integration.token = token
        },
        replacePrompt(newPrompt) {
            this.prompt = newPrompt

        },
        reset() {
            this.integration = getIntegrations().huggingFace
            this.prompt = getDefaultPrompt()
        }
    },
})