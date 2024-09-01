<template>
  <SectionHeadline>Customize prompt or upload agents:</SectionHeadline>
  <SectionExcerpt>
    Customize the conversation prompt template, or upload a custom JSON file containing a list of new
    agents. The default agent list can be downloaded on the More Information page and suits as a template for customization.
  </SectionExcerpt>

  <div>
    <Caption class="block ml-1 mb-2">Change Prompt (must contain <code>{history}</code> and  <code>{thread}</code>):</Caption>
    <Floater>
      <Textarea
          class="w-full"
          :value="getConfigStore().getPrompt"
          @input="(event) => getConfigStore().replacePrompt(event.target.value)"
      ></Textarea>
    </Floater>
  </div>

  <Spacer size="tiny" />

  <div>
    <Caption class="block ml-1 mb-2">Replace Agent list (JSON file, see More Information)</Caption>
    <Floater>
      <div class="flex flex-col sm:flex-row gap-3">
        <input
              accept=".json"
              class="block grow w-full text-sm text-slate-500 rounded-lg px-2 p-x-2.5 py-3.5 cursor-pointer bg-slate-100 file:bg-transparent file:border-0"
              label="Agent JSON Upload"
              type="file"
              @change="uploadAgents($event)">
        <Button 
          :disabled="!hasNewAgents" 
          @click="replaceAgents()"
          >
            <ArrowUpTrayIcon class="h-8 w-8 text-gray-600"/>
        </Button>
      </div>
    </Floater>
  </div>

</template>

<script>
import SectionHeadline from "@/components/typography/SectionHeadline.vue"
import SectionExcerpt from "@/components/typography/SectionExcerpt.vue"

import Input from "@/components/atoms/Input.vue"
import Textarea from "@/components/atoms/Textarea.vue"
import Button from "@/components/atoms/Button.vue"

import {getConfigStore} from "@/stores/config"
import {getAgentsStore} from "@/stores/agents"

import {uploadJSON} from "@/common"
import Floater from "./atoms/Floater.vue"
import Caption from "@/components/typography/Caption.vue"
import Spacer from "./atoms/Spacer.vue"

import { ArrowUpTrayIcon } from "@heroicons/vue/24/outline"

export default {
  components: {
    Caption,
    SectionExcerpt,
    SectionHeadline,
    Input,
    Textarea,
    Button,
    Spacer,
    Floater,
    ArrowUpTrayIcon
  },
  data() {
    return {
      newAgents: [],
      model: getConfigStore().getModel
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
    replaceAgents() {
      if (this.hasNewAgents) {
        getAgentsStore().replace(this.newAgents)
        alert("Agents successfully replaced.")
      }
    },
    getConfigStore,
  }
}
</script>
