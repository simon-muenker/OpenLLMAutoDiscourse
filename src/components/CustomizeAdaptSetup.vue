<template>
  <ContentHead>Customize model/prompt or replace agents:</ContentHead>
  <ContentLine>
    Customize the conversation and change the LLM and base prompt, or upload a custom JSON file containing a list of new
    agents. Use the full Hugging Face name and check if the model is available under the free inferencing API. The
    default agent list can be downloaded on the More Information page and suits as a template for customization.
  </ContentLine>

  <div class="flex flex-col gap-3">

    <div class="flex flex-col grow">
      <InputLabel>Change model (expects Hugging Face identifier):</InputLabel>
      <Input
          :defaultValue="configStore().getModel"
          @update="(newModel) => configStore().replaceModel(newModel)"
      />
    </div>

    <div class="flex flex-col grow">
      <InputLabel>Change Prompt (must contain <code>{persona}|{text}</code> to replace):</InputLabel>
      <Textarea
          :defaultValue="configStore().getPrompt"
          @update="(newPrompt) => configStore().replacePrompt(newPrompt)"
          rows="10"
      />
    </div>

    <div class="flex flex-col grow">
      <InputLabel>Replace Agent list (JSON file, see More Information)</InputLabel>
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="grow">
          <input
              accept=".json"
              class="block w-full text-sm text-slate-500 border border-slate-300 rounded-lg px-2 p-x-2.5 py-3.5 cursor-pointer bg-slate-100 file:bg-transparent file:border-0"
              type="file"
              @change="uploadAgents($event)"
          >
        </div>
        <Button :disabled="!hasNewAgents" @click="replaceAgents()">Replace Agents</Button>
      </div>
    </div>

  </div>
</template>

<script>
import ContentHead from "@/components/atoms/ContentHead.vue"
import ContentLine from "@/components/atoms/ContentLine.vue"
import Input from "@/components/atoms/Input.vue"
import InputLabel from "@/components/atoms/InputLabel.vue"
import Textarea from "@/components/atoms/Textarea.vue"
import Button from "@/components/atoms/Button.vue"

import {getAgentsStore, getConfigStore} from "@/store"

import {uploadJSON} from "@/common"


export default {
  components: {
    InputLabel,
    ContentLine,
    ContentHead,
    Input,
    Textarea,
    Button,
  },
  data() {
    return {
      newAgents: []
    }
  },
  computed: {
    hasNewAgents() {
      return this.newAgents.length > 0
    }
  },
  methods: {
    configStore: getConfigStore,
    async uploadAgents(event) {
      this.newAgents = await uploadJSON(event.target.files[0])
    },
    replaceAgents() {
      if (this.hasNewAgents) {
        getAgentsStore().replace(this.newAgents)
        alert("Agents successfully replaced.")
      }
    }
  }
}
</script>
