import {defineStore} from "pinia"
import _ from "lodash"

import {postChat, postMetrics} from "@/api"
import createPrompt from "@/prompt"

export const getThreadStore = defineStore('thread', {
    state: () => ({
        agents: new Set(),
        thread: []
    }),
    getters: {
        getAgents: (state) => state.agents,
        getThread: (state) => state.thread,

        getRandomAgent: (state) => {
            if (state.agents.size === 1) return _.last(Array.from(state.agents))

            let agent = _.sample(Array.from(state.agents))

            while (agent.id === _.last(state.thread).id) {
                agent = _.sample(Array.from(state.agents))
            }

            return agent
        }
    },
    actions: {
        updateAgents(agent) {
            if (this.agents.has(agent)) {
                this.agents.delete(agent)

            } else {
                this.agents.add(agent)
            }
        },
        addPost(id, name, icon, message, metrics=null) {
            this.thread.push({
                'id': id,
                'name': name,
                'icon': icon,
                'message': message,
                'metrics': metrics
            })
        },
        async queryNextPost(model, agent) {
            let message = await postChat(model, agent.persona.trim(), createPrompt(this.getThread, agent)).then(response => response.response)
            let met = await postMetrics([message]).then(response => response['predictions'][0]['results'])

            this.addPost(
                agent.id,
                agent.name,
                agent.icon,
                message,
                met
            )
        },
        reset() {
            this.agents = new Set()
            this.thread = []
        }
    },
})