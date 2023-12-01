<template>

  <PageHead>TWON: Threads</PageHead>

  <template v-if="!submitted">

    <PageExcerpt>
      Explore how a Large Language Model, adapted to the behavior of different agents, behaves in a thread started by
      your post. Select the agents to let them participate in your discourse and post your message.
    </PageExcerpt>

    <Divider/>

    <InteractAgentSelect/>

    <Divider/>

    <InteractUserMessage @submit="start_thread"/>

  </template>

  <template v-if="submitted">

    <Divider/>

    <InteractThread/>

    <template v-if="running">
      <span class="text-6xl font-bold text-slate-500 animate-pulse text-center">...</span>
    </template>

    <Divider/>

    <div class="flex gap-6">


      <Button :class="[!running ? '!bg-emerald-500' : '!bg-rose-500']" @click="toggleRunning">
        {{ !running ? 'Start' : 'Stop' }}
      </Button>

      <Button @click="reset">New Conversation</Button>

      <button
          class="underline underline-offset-4 text-slate-500"
          @click="downloadJSON(getThreadStore().getPosts, 'thread')"
      >
        Download Thread
      </button>

    </div>

    <p class="text-sm font-normal text-slate-600 leading-relaxed mt-4">
      When beginning a new conversation, all messages will be deleted. However, the agent list and configuration remain.
      For a complete reset, reload the page.
    </p>

  </template>

  <p class="text-xs font-normal text-slate-600 leading-relaxed mt-4">
    Current Endpoint: {{ getConfigStore().getIntegration.label }}
  </p>

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
import InteractThread from "@/components/InteractThread.vue"

import {getConfigStore} from "@/stores/config"
import {getThreadStore} from "@/stores/thread"
import {getAgentsStore} from "@/stores/agents"

import {downloadJSON} from "@/common"


export default {
  components: {
    PageExcerpt,
    PageHead,
    Divider,
    Button,
    Container,
    InteractUserMessage,
    InteractAgentSelect,
    InteractThread,
  },
  data() {
    return {
      submitted: false,
      running: false,
    }
  },
  mounted() {
    this.reset()
  },
  unmounted() {
    this.running = false
  },
  methods: {
    start_thread: async function (message) {
      if (!message || getThreadStore().getAgents.length === 0) return
      this.submitted = true
      this.running = true

      getThreadStore().addPost(
          'user',
          'You',
          '🗣',
          message
      )

      await this.generateMessages()
    },
    generateMessages: async function () {
      while (this.running) {
        let agent = getThreadStore().getRandomAgent
        await getThreadStore().queryNextPost(agent, getConfigStore().getIntegration.name)
        await new Promise(resolve => setTimeout(resolve, _.random(500, 2000)))
        if (getThreadStore().getPosts.length > 25) this.running = false
      }
    },
    reset: function () {
      this.submitted = false
      this.running = false

      getThreadStore().reset()
    },
    toggleRunning: function () {
      this.running = !this.running
      if (this.running) this.generateMessages()
    },
    getThreadStore,
    getAgentsStore,
    getConfigStore,
    downloadJSON
  }
}
</script>
