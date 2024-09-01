import { defineStore } from 'pinia'
import getDefaultAgents from '@/data/agents'

export const getAgentsStore = defineStore('agents', {
    state: () => ({
        agents: getDefaultAgents(),
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
        },
    },
})
