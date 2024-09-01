<template>
  <div class="flex flex-col gap-4 items-start">
    <template v-for="element in agents">
      <Floater 
        :id="element.id"
        class="flex gap-4 p-3 cursor-pointe pr-1 sm:pr-3 border-2 border-r-8 border-transparent" 
        :class="{ '!border-green-400': getThreadStore().getAgents.has(element) }"
         @click="() => toggle(element)"
      >
        <div>
          <div class="text-3xl p-1 h-12 w-12 text-center">
            {{ element.icon }}
          </div>
        </div>
        <div>
          <span class="block font-light text-sm mb-1">
            <span class="font-bold pr-1">{{ element.name }}</span>
            <span class="text-slate-500">@{{ element.id }}</span>
          </span>
          <span> {{ element.summary }} </span>
        </div>
      </Floater>
    </template>
  </div>
</template>

<script>
import {getAgentsStore} from "@/stores/agents"
import {getThreadStore} from "@/stores/thread"

import Floater from "@/components/atoms/Floater.vue"


export default {
  name: "ConfigureModel",
    components: {
      Floater
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
