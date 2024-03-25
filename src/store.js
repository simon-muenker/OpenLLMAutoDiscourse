import {defineStore} from "pinia"

import getDefaultAgents from "@/api/agents"
import {getDefaultModel, getDefaultPrompt} from "@/api/config"

export const getAgentsStore = defineStore('agents', {
    state: () => ({
        agents: null
    }),
    getters: {
        getAgents: (state) => state.agents,
        hasAgents: (state) => state.agents != null
    },
    actions: {
        addAgent(agent) {
            this.agents.push(agent)
        },
        replace(newAgents) {
            this.agents = newAgents
            console.log(this.agents)
        },
        async fetch() {
            getDefaultAgents().then(agents => this.replace(agents))
        }
    },
})

export const getConfigStore = defineStore('config', {
    state: () => ({
        model: getDefaultModel(),
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
        replaceModel(newModel) {
            this.model = newModel

        },
        replacePrompt(newPrompt) {
            this.prompt = newPrompt

        },
        reset() {
            this.model = getDefaultModel()
            this.prompt = getDefaultPrompt()
        }
    },
})