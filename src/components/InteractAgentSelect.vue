<template>
  <div class="flex flex-col gap-2 items-start">
    <template v-for="element in agents">
      <ThreadItem
          :id="element.id"
          :class="{ '!bg-green-200': getThreadStore().getAgents.has(element) }"
          :icon="element.icon"
          :name="element.name"
          :text="element.summary"
          class="cursor-pointer"
          @click="() => toggle(element)"
      />
    </template>
  </div>
</template>

<script>
import {getAgentsStore} from "@/stores/agents"
import {getThreadStore} from "@/stores/thread"


import ThreadItem from "@/components/InteractThreadItem.vue"

export default {
  components: {
    ThreadItem
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
