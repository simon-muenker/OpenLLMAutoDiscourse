import {defineStore} from "pinia"

import { getModels } from "@/api"
import {getDefaultPrompt} from "@/data/prompt"


export const getConfigStore = defineStore('config', {
    state: () => ({
        model: "",
        prompt: "",
        model_selection: [],
    }),
    getters: {
        getConfig: (state) => ({
            "model": state.model,
            "prompt": state.prompt
        }),
        getModel: (state) => state.model,
        getPrompt: (state) => state.prompt,
        getModelSelection: (state) => state.model_selection,
    },
    actions: {
        init() {
            console.debug(">> init config store")
            getModels()
                .then(res => {
                    this.model_selection = res
                    console.debug(">> model selection retrieved")
                    this.setModel(this.model_selection[0].id) 
                })

            this.prompt = getDefaultPrompt()
        },
        setModel(newModel) {
            this.model = newModel
            console.debug(`>> active model set to: ${this.model}`)
        },
        replacePrompt(newPrompt) {
            this.prompt = newPrompt
        },
        async reset() {
            this.init()
        }
    },
})