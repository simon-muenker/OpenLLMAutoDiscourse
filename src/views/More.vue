<template>
    <PageHeadline>Information</PageHeadline>

    <PageExcerpt>
        The page contains the configuration for the API interaction (hugging
        face) and prompt/agent templates.
    </PageExcerpt>

    <Divider />

    <SectionHeadline>
        Inference Configuration
        <span
            class="cursor-pointer text-lg font-light text-slate-500"
            @click="downloadJSON(getConfigStore().getConfig, 'setup')"
        >
            (download)
        </span>
    </SectionHeadline>
    <vue-json-pretty :data="getConfigStore().getConfig" />

    <Divider />

    <SectionHeadline>
        Agent Configuration
        <span
            class="cursor-pointer text-lg font-light text-slate-500"
            @click="downloadJSON(getAgentsStore().getAgents, 'agents')"
        >
            (download)
        </span>
    </SectionHeadline>
    <vue-json-pretty :data="getAgentsStore().getAgents" />
</template>

<script setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

import PageHeadline from '@/components/typography/PageHeadline.vue'
import PageExcerpt from '@/components/typography/PageExcerpt.vue'
import SectionHeadline from '@/components/typography/SectionHeadline.vue'

import Divider from '@/components/atoms/Divider.vue'

import { getConfigStore } from '@/stores/config'
import { getAgentsStore } from '@/stores/agents'

import { downloadJSON } from '@/common'
</script>
