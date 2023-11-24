<template>

  <PageHead>ReplyRift</PageHead>

  <template v-if="!submitted">

    <PageExcerpt>
      Explore how a Large Language Model, adapted to the behavior of different agents, behaves in a thread started by
      your post. Select the agents to let them participate in your discourse and post your message.
    </PageExcerpt>

    <Divider/>

    <InteractAgentSelect
        :agents="getAgentsStore().agents"
        @update="update"
    />

    <Divider/>

    <InteractUserMessage @submit="start_thread"/>

  </template>

  <template v-if="submitted">

    <Divider/>

    <Thread :thread_items="thread_items"/>

    <template v-if="!stopped">
      <span class="text-6xl font-bold text-slate-500 animate-pulse text-center">...</span>
    </template>

    <Divider/>

    <div class="flex gap-6">

      <Button @click="reset">New Conversation</Button>

      <template v-if="!stopped">
        <Button class="bg-rose-500" @click="stop">Stop</Button>
      </template>

      <button
          class="underline underline-offset-4 text-slate-500"
          @click="downloadJSON(thread_items, 'thread')"
      >
        Download Thread
      </button>

    </div>

    <p class="text-sm font-normal text-slate-600 leading-relaxed mt-4">
      When beginning a new conversation, all messages will be deleted. However, the agent list and configuration remain.
      For a complete reset, reload the page.
    </p>

  </template>

</template>

<script>
import _ from "lodash"

import PageHead from "@/components/atoms/PageHead.vue"
import PageExcerpt from "@/components/atoms/PageExcerpt.vue"
import Container from '@/components/atoms/Container.vue'
import Button from "@/components/atoms/Button.vue"
import Divider from "@/components/atoms/Divider.vue"

import InteractUserMessage from "@/components/InteractUserMessage.vue"
import InteractAgentSelect from "@/components/InteractAgentSelect.vue"
import Thread from "@/components/InteractThread.vue"

import {getAgentsStore} from "@/store"
import {downloadJSON} from "@/common"
import postInference from "@/api/inference"


export default {
  components: {
    PageExcerpt,
    PageHead,
    Divider,
    Button,
    Container,
    InteractUserMessage,
    InteractAgentSelect,
    Thread,
  },
  data() {
    return {
      submitted: false,
      stopped: false,
      thread_items: [],
      agents: [],
    }
  },
  methods: {
    update: function (selection) {
      this.agents = _.cloneDeep(selection)
    },
    start_thread: async function (message) {
      if (!message || this.agents.length === 0) return
      this.submitted = true

      this.thread_items.unshift({
        'id': 'user',
        'name': 'You',
        'icon': '🗣️',
        'message': message
      })

      while (!this.stopped) {
        let current_agent = this.get_random_agent()
        await this.generate_response(current_agent)

        if (this.thread_items.length > 25) this.stop()
      }
    },
    get_random_agent: function () {
      let agent = _.sample(this.agents)

      while (agent.id === this.thread_items[this.thread_items.length - 1].id) {
        agent = _.sample(this.agents)
      }

      return agent
    },
    generate_response: async function (agent) {
      await postInference(this.thread_items[this.thread_items.length - 1].message, agent.persona)
          .then(reply => this.thread_items.push({
            'id': agent.id,
            'name': agent.name,
            'icon': agent.icon,
            'message': reply
          }))

      await new Promise(resolve => setTimeout(resolve, _.random(500, 2000)))
    },
    reset: function () {
      this.submitted = false
      this.stopped = false
      this.thread_items = []
      this.agents = []
    },
    stop: function () {
      this.stopped = true
    },
    getAgentsStore,
    downloadJSON
  }
}
</script>
