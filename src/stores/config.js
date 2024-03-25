import {defineStore} from "pinia"
import {getDefaultPrompt, getModels} from "@/data/config"

export const getConfigStore = defineStore('config', {
    state: () => ({
        model: getModels()[0],
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
        reset() {
            this.model = getModels()[0]
            this.prompt = getDefaultPrompt()
        }
    },
})