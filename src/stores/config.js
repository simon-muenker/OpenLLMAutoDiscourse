import {defineStore} from "pinia"
import {getDefaultPrompt, getModels} from "@/data/config"

export const getConfigStore = defineStore('config', {
    state: () => ({
        model: 'llama3.1:8b-instruct-q6_K',
        prompt: getDefaultPrompt()
    }),
    getters: {
        getConfig: (state) => ({
            "model": state.model,
            "prompt": state.prompt
        }),
        getModel: (state) => state.model,
        getPrompt: (state) => state.prompt,
    },
    actions: {
        replaceModel(model) {
            this.model = model
        },
        replacePrompt(newPrompt) {
            this.prompt = newPrompt
        },
        async reset() {
            this.model = await getModels()[0]
            this.prompt = getDefaultPrompt()
        }
    },
})