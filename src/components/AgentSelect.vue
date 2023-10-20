<template>
  <draggable
      :group="{ name: 'agents', pull: 'clone', put: false }"
      :list="agents"
      class="flex flex-wrap gap-3"
      item-key="name"
  >
    <template #item="{ element }">
      <div class="sm:text-lg font-semibold text-slate-600 cursor-move">
        {{ element.label }}
      </div>
    </template>
  </draggable>
  <draggable
      :list="selection"
      class="bg-orange-100 p-4 rounded-lg flex flex-col items-start gap-4 min-h-[16rem] max-h-fit"
      group="agents"
      item-key="name"
      @change="$emit('update', selection)"
  >
    <template #item="{ element }">
      <Message :author="element.label"/>
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable"

import Message from "@/components/atoms/Message.vue"

export default {
  components: {
    draggable,
    Message
  },
  props: {
    agents: Array
  },
  data() {
    return {
      selection: []
    }
  },
  emits: ["update"]
}
</script>
