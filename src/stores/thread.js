import {defineStore} from "pinia"
import _ from "lodash"

import {GPTInference, hfInference} from "@/inference"
import {getConfigStore} from "@/stores/config"

export const getThreadStore = defineStore('thread', {
    state: () => ({
        agents: new Set(),
        posts: []
    }),
    getters: {
        getAgents: (state) => state.agents,
        getPosts: (state) => state.posts,

        getRandomAgent: (state) => {
            let agent = _.sample(Array.from(state.agents))

            while (agent.id === _.last(state.posts).id) {
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
            this.posts.push({
                'id': id,
                'name': name,
                'icon': icon,
                'message': message
            })
        },
        async queryNextPost(agent, integration) {
            await {
                huggingFace: hfInference,
                openAI: GPTInference
            }[integration](fillPrompt(
                agent.persona,
                createHistory(this.getPosts, agent),
                createThread(this.getPosts, agent),
            ))
                .then(reply => this.addPost(
                    agent.id,
                    agent.name,
                    agent.icon,
                    reply
                ))
        },
        reset() {
            this.agents = new Set()
            this.posts = []
        }
    },
})

function fillPrompt(persona, history, thread) {
    prompt = getConfigStore().getPrompt
        .replace('{persona}', persona.trim())
        .replace('{history}', history.trim())
        .replace('{thread}', thread.trim())

    console.log(prompt)
    return prompt
}

function createThread(posts, agent, n = 2) {
    let thread = `Post by ${_.first(posts).id}: ${_.first(posts).message.replace(/(\r\n|\n|\r)/gm, "")}\n\n`

    _.takeRight(posts.slice(1).filter(item => item.id !== agent.id), n).forEach(
        item => thread += `Reply by ${item.id}: ${item.message.replace(/(\r\n|\n|\r)/gm, "")}\n\n`
    )

    return thread
}

function createHistory(posts, agent, n = 2) {
    let history = ""

    _.takeRight(posts.filter(item => item.id === agent.id), n).forEach(
        item => history += `You posted: ${item.message.replace(/(\r\n|\n|\r)/gm, "")}\n\n`
    )

    if (history.length === 0) history += "You have not interacted in the thread yet."

    return history
}