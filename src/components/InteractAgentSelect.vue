<template>
  <div class="flex flex-col gap-2 items-start">
    <template v-for="element in agents">
      <Message
          :id="element.id"
          :class="{ '!bg-green-200': this.selection.has(element) }"
          :icon="element.icon"
          :name="element.name"
          :text="'Persona: ' + element.persona"
          @click="() => toggle(element)"
          class="cursor-pointer"
      />
    </template>
  </div>
</template>

<script>
import Message from "@/components/InteractThreadItem.vue"

export default {
  components: {
    Message
  },
  props: {
    agents: Array
  },
  data() {
    return {
      selection: new Set()
    }
  },
  emits: ["update"],
  methods: {
    toggle: function (agent) {

      if (this.selection.has(agent)) {
        this.selection.delete(agent)

      } else {
        this.selection.add(agent)
      }

      this.$emit('update', Array.from(this.selection))
    }
  }
}
</script>
