<template>

  <Header>
    <template v-slot:title>
      ReplyRift
    </template>
    <template v-slot:excerpt>
      Explore how a Large Language Model, adapted to the behavior of different agents, responds to your message. Drag
      and drop the agents into a desired order and send your message to generate the conversation.
    </template>
  </Header>

  <template v-if="!submitted">
    <AgentSelection :agents="agents" @update="sync"/>
    <UserMessage @submit="generate"/>
  </template>

  <template v-if="submitted">
    <Conversation :conversation="conversation"/>
    <div class="flex gap-6">
      <Button :action="reset">Reset</Button>
      <button
          class="underline underline-offset-4 text-slate-500"
          @click="download_json(conversation, 'conversation')"
      >
        Download Conversation
      </button>
    </div>
  </template>

</template>

<script>
import Container from '@/components/atoms/Container.vue'
import Button from "@/components/atoms/Button.vue"

import Header from '@/components/atoms/Header.vue'
import UserMessage from "@/components/UserMessage.vue"
import AgentSelection from "@/components/AgentSelection.vue"
import Conversation from "@/components/Conversation.vue"

import get_inference from "@/api/inference"
import get_agents from "@/api/agents"
import {download_json} from "@/common";

export default {
  components: {
    Button,
    Container,
    Header,
    UserMessage,
    AgentSelection,
    Conversation
  },
  data() {
    return {
      agents: get_agents(),
      submitted: false,
      conversation: [],
    }
  },
  methods: {
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

        get_inference(this.conversation[0].message, agent.persona)
            .then(reply => this.conversation[idx].message = reply)
      })
    },
    sync: function (selection) {
      this.conversation = selection
    },
    reset: function () {
      this.agents = get_agents()
      this.submitted = false
      this.conversation = []
    },
    download_json
  }
}
</script>
