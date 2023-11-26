<template>
  <ContentHead>Customize model/prompt or replace agents:</ContentHead>
  <ContentLine>
    Customize the conversation and change the LLM and base prompt, or upload a custom JSON file containing a list of new
    agents. Use the full Hugging Face name and check if the model is available under the free inferencing API. The
    default agent list can be downloaded on the More Information page and suits as a template for customization.
  </ContentLine>

  <div class="flex flex-col gap-3">

    <div class="flex flex-col grow">
      <InputLabel>Change Model (Falcon-7b | GPT-3.5):</InputLabel>

      <select
          v-model="integration"
          class="rounded-lg p-2.5 text-slate-700 bg-slate-100 cursor-pointer leading-loose"
          @change="changeIntegration()"
      >
        <option value="huggingFace">Hugging Face (Falcon-7b-instruct)</option>
        <option value="openAI">OpenAI (GPT-3.5-turbo)</option>
      </select>

    </div>

    <div v-if="integration === 'openAI'" class="flex flex-col grow">
      <InputLabel>API-Key:</InputLabel>
      <Input label="API-Key" @update="(token) => getConfigStore().setIntegrationToken(token)"/>
    </div>

    <div class="flex flex-col grow">
      <InputLabel>Change Prompt (must contain <code>{persona}|{text}</code> to replace):</InputLabel>
      <Textarea
          :defaultValue="getConfigStore().getPrompt"
          @update="(newPrompt) => getConfigStore().replacePrompt(newPrompt)"
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

import {getConfigStore} from "@/stores/config"
import {getAgentsStore} from "@/stores/agents"

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
      newAgents: [],
      integration: getConfigStore().getIntegration.name,
    }
  },
  computed: {
    hasNewAgents() {
      return this.newAgents.length > 0
    }
  },
  methods: {
    async uploadAgents(event) {
      this.newAgents = await uploadJSON(event.target.files[0])
    },
    changeIntegration() {
      getConfigStore().changeIntegration(this.integration)
    },
    replaceAgents() {
      if (this.hasNewAgents) {
        getAgentsStore().replace(this.newAgents)
        alert("Agents successfully replaced.")
      }
    },
    getConfigStore
  }
}
</script>
