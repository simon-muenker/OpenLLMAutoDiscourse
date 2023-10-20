import {defineStore} from "pinia"

import getDefaultAgents from "@/api/agents"
import {getDefaultModel, getDefaultPrompt} from "@/api/config"

export const getAgentsStore = defineStore('agents', {
    state: () => ({
        agents: getDefaultAgents()
    }),
    getters: {
        getAgents: (state) => state.agents,
    },
    actions: {
        addAgent(agent) {
            this.agents.push(agent)
        },
        replace(newAgents) {
            this.agents = newAgents
        },
        reset() {
            this.agents = getDefaultAgents()
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