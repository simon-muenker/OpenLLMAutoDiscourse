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
    Prompting Configuration
  </h2>
  <vue-json-pretty :data="inference_setup"/>

  <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 mt-4 mb-2">
    Agent Configuration
  </h2>
  <vue-json-pretty :data="get_agents()"/>

</template>
<script setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

import Header from "@/components/atoms/Header.vue"

import get_agents from "@/api/agents"
import {inference_setup} from "@/api/inference"
</script>