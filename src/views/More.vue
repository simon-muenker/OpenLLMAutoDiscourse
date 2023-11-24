<template>

  <PageHead>Information</PageHead>

  <PageExcerpt>
    The page contains the configuration for the API interaction (hugging face) and prompt/agent templates.
  </PageExcerpt>

  <Divider/>

  <ContentHead>
    Inference Configuration
    <span
        class="cursor-pointer text-lg font-light text-slate-500"
        @click="downloadJSON(getConfigStore().getConfig, 'setup')"
    >
      (download)
    </span>
  </ContentHead>
  <vue-json-pretty :data="getConfigStore().getConfig"/>

  <Divider/>

  <ContentHead>
    Agent Configuration
    <span
        class="cursor-pointer text-lg font-light text-slate-500"
        @click="downloadJSON(getAgentsStore().getAgents, 'agents')"
    >
      (download)
    </span>
  </ContentHead>
  <vue-json-pretty :data="getAgentsStore().getAgents"/>
</template>

<script setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

import PageHead from "@/components/atoms/PageHead.vue"
import PageExcerpt from "@/components/atoms/PageExcerpt.vue"
import ContentHead from "@/components/atoms/ContentHead.vue"
import Divider from "@/components/atoms/Divider.vue"

import {getAgentsStore, getConfigStore} from "@/store"
import {downloadJSON} from "@/common"
</script>