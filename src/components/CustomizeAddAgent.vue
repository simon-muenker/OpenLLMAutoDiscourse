<template>
  <ContentHead>Add your custom agent:</ContentHead>
  <ContentLine>
    Create a custom agent and add it to the conversation above. Fill in the fields below and provide a custom persona.
    After adding it to the list, the agent appears directly in the above selection. The name denotes the unique
    identifier, while the label shows as the screen name. Thus, omit the usage of emojis or other special characters in
    the label name field.
  </ContentLine>

  <div class="flex flex-col sm:flex-row gap-3">
    <Input ref="name" label="Name" @update="(text) => name = text"/>
    <Input ref="icon" label="icon" @update="(text) => icon = text"/>
  </div>

  <div class="flex flex-col sm:flex-row gap-3 sm:items-end">
    <Textarea
        ref="persona"
        placeholder="Add a persona"
        @update="(text) => persona = text"
    />
    <Button :disabled="!canAdd" @click="add">Add Agent</Button>
  </div>

  <span class="mt-4 font-bold text-slate-600">Preview:</span>
  <vue-json-pretty :data="agent"/>
  <vue-json-pretty :data="{'prompt': prompt}"/>

</template>

<script>
import VueJsonPretty from "vue-json-pretty"
import _ from "lodash"

import ContentHead from "@/components/atoms/ContentHead.vue"
import ContentLine from "@/components/atoms/ContentLine.vue"
import Textarea from "@/components/atoms/Textarea.vue"
import Input from "@/components/atoms/Input.vue"
import Button from "@/components/atoms/Button.vue"

import {getConfigStore} from "@/stores/config"
import {getAgentsStore} from "@/stores/agents"


export default {
  components: {
    ContentLine,
    ContentHead,
    Input,
    Textarea,
    Button,
    VueJsonPretty,
  },
  data() {
    return {
      name: "",
      icon: "",
      persona: "",
    }
  },
  computed: {
    agent() {
      return {
        "id": _.snakeCase(this.name),
        "name": this.name,
        "icon": this.icon,
        "persona": this.persona
      }
    },
    prompt() {
      return !this.persona ? getConfigStore().getPrompt : getConfigStore().getPrompt.replace("{persona}", this.persona)
    },
    canAdd() {
      return this.name && this.icon && this.persona
    }
  },
  methods: {
    agentsStore: getAgentsStore,
    add() {
      if (this.canAdd) {
        getAgentsStore().addAgent(this.agent)

        this.$refs.name.reset()
        this.$refs.icon.reset()
        this.$refs.persona.reset()

        this.name = ""
        this.icon = ""
        this.persona = ""
      }
    }
  },
}
</script>