<template>
  <div class="flex flex-col gap-2 items-start">
    <template v-for="element in agents">
      <Message
          :id="element.id"
          :class="{ '!bg-green-200': getThreadStore().getAgents.has(element) }"
          :icon="element.icon"
          :name="element.name"
          :text="'Persona: ' + element.persona"
          class="cursor-pointer"
          @click="() => toggle(element)"
      />
    </template>
  </div>
</template>

<script>
import {getAgentsStore} from "@/stores/agents"
import {getThreadStore} from "@/stores/thread"


import Message from "@/components/InteractThreadItem.vue"

export default {
  components: {
    Message
  },
  data() {
    return {
      'agents': getAgentsStore().getAgents
    }
  },
  methods: {
    getThreadStore,
    toggle: function (agent) {
      getThreadStore().updateAgents(agent)
    }
  }
}
</script>
