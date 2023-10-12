<template>
  <Header>
    <template v-slot:title>
      Information
    </template>
    <template v-slot:excerpt>
      The page contains the configuration for the API interaction (hugging face) and prompt/agent templates.
    </template>
  </Header>

  <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 mt-4 mb-2">
    Inference Configuration
    <span
        class="cursor-pointer text-lg font-light text-slate-500"
        @click="download_json(inferenceConfig, 'setup')"
    >
      (download)
    </span>
  </h2>
  <vue-json-pretty :data="inferenceConfig"/>

  <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 mt-4 mb-2">
    Agent Configuration
    <span
        class="cursor-pointer text-lg font-light text-slate-500"
        @click="download_json(agentConfig, 'agents')"
    >
      (download)
    </span>
  </h2>
  <vue-json-pretty :data="agentConfig"/>

</template>
<script setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

import Header from "@/components/atoms/Header.vue"

import {agentConfig} from "@/api/agents"
import {inferenceConfig} from "@/api/inference"
import {download_json} from "@/common";
</script>