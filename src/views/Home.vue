<template>

  <PageHead>ReplyRift</PageHead>

  <template v-if="!submitted">

    <PageExcerpt>
      Explore how a Large Language Model, adapted to the behavior of different agents, responds to your message. Drag
      and drop the agents into a desired order and send your message to generate the conversation.
    </PageExcerpt>

    <Divider/>

    <AgentSelection
        :agents="getAgentsStore().agents"
        @update="update"
    />
    <UserMessage @submit="generate"/>

    <Divider/>

    <AgentCreate/>

    <Divider/>

    <Customization/>

  </template>

  <template v-if="submitted">

    <Divider/>

    <Conversation :conversation="conversation"/>

    <div class="flex gap-6">

      <Button @click="reset">New Conversation</Button>
      <button
          class="underline underline-offset-4 text-slate-500"
          @click="downloadJSON(conversation, 'conversation')"
      >
        Download Conversation
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

import UserMessage from "@/components/UserMessage.vue"
import AgentSelection from "@/components/AgentSelect.vue"
import Conversation from "@/components/Conversation.vue"
import AgentCreate from "@/components/AgentCreate.vue"
import Customization from "@/components/Customization.vue"

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
    AgentCreate,
    UserMessage,
    AgentSelection,
    Conversation,
    Customization
  },
  data() {
    return {
      submitted: false,
      conversation: [],
    }
  },
  methods: {
    update: function (selection) {
      this.conversation = _.cloneDeep(selection)
    },
    generate: function (message) {
      if (!message || this.conversation.length === 0) return

      this.submitted = true

      this.conversation.unshift({
        'name': 'user',
        'label': 'You',
        'message': message
      })

      this.conversation.forEach(async (agent, idx) => {

        if (agent.name === 'user') {
          return
        }

        postInference(this.conversation[0].message, agent.persona)
            .then(reply => this.conversation[idx].message = reply)
      })
    },
    reset: function () {
      this.submitted = false
      this.conversation = []
    },
    getAgentsStore,
    downloadJSON
  }
}
</script>
