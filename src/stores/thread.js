import {defineStore} from "pinia"
import _ from "lodash"
import {GPTInference, hfInference} from "@/inference"

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

            let thread_text = 'Post: ' + _.first(this.getPosts).message + '\n'
            _.takeRight(this.getPosts.slice(1), 5).forEach(item => thread_text += 'Reply: ' + item.message + '\n');

            await {
                huggingFace: hfInference,
                openAI: GPTInference
            }[integration](thread_text, agent.persona)
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