import {defineStore} from "pinia"
import _ from "lodash"

import {inference} from "@/inference"
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
        addPost(id, name, icon, message) {
            this.thread.push({
                'id': id,
                'name': name,
                'icon': icon,
                'message': message
            })
        },
        async queryNextPost(model, agent) {
            await inference(model, createPrompt(this.getThread, agent))
                .then(response => this.addPost(
                    agent.id,
                    agent.name,
                    agent.icon,
                    response.response
                ))
        },
        reset() {
            this.agents = new Set()
            this.thread = []
        }
    },
})