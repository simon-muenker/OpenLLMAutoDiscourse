<template>
    <PageHeadline>TWON: Threads</PageHeadline>

    <template v-if="!submitted">
        <PageExcerpt>
            Explore how a Large Language Model, adapted to the behavior of
            different agents, behaves in a thread started by your post. Select
            the agents to let them participate in your discourse and post your
            message.
        </PageExcerpt>

        <Divider />

        <SectionHeadline>select agents</SectionHeadline>

        <ConfigureAgents />

        <Divider />

        <SectionHeadline>type your message</SectionHeadline>

        <InteractUserMessage @submittedUserMessage="start_thread" />
    </template>

    <template v-if="submitted">
        <Divider />

        <InteractThread />

        <template v-if="running">
            <span
                class="text-6xl font-bold text-slate-500 animate-pulse text-center"
                >...</span
            >
        </template>

        <Divider />

        <div class="flex gap-6">
            <Button
                :class="[!running ? '!bg-emerald-500' : '!bg-rose-500']"
                class="p-2 rounded-lg text-white"
                @click="toggleRunning"
            >
                {{ !running ? 'Start' : 'Stop' }}
            </Button>

            <Button
                class="bg-amber-500 p-2 rounded-lg text-white"
                @click="reset"
            >
                New Conversation
            </Button>

            <button
                class="underline underline-offset-4 text-slate-500"
                @click="downloadJSON(getThreadStore().getThread, 'thread')"
            >
                Download Thread
            </button>
        </div>

        <Caption>
            When beginning a new conversation, all messages will be deleted.
            However, the agent list and configuration remain. For a complete
            reset, reload the page.
        </Caption>
    </template>

    <template v-if="!submitted">
        <Divider />

        <SectionHeadline>select a language model (optionally)</SectionHeadline>

        <ConfigureModel />
    </template>
</template>

<script>
import _ from 'lodash'

import PageHeadline from '@/components/typography/PageHeadline.vue'
import PageExcerpt from '@/components/typography/PageExcerpt.vue'
import SectionHeadline from '@/components/typography/SectionHeadline.vue'
import Caption from '@/components/typography/Caption.vue'

import Container from '@/components/atoms/Container.vue'
import Button from '@/components/atoms/Button.vue'
import Divider from '@/components/atoms/Divider.vue'

import ConfigureModel from '@/components/ConfigureModel.vue'
import ConfigureAgents from '@/components/ConfigureAgents.vue'

import InteractUserMessage from '@/components/InteractUserMessage.vue'
import InteractThread from '@/components/InteractThread.vue'

import { getConfigStore } from '@/stores/config'
import { getThreadStore } from '@/stores/thread'
import { getAgentsStore } from '@/stores/agents'

import { downloadJSON } from '@/common'

export default {
    components: {
        PageExcerpt,
        PageHeadline,
        SectionHeadline,
        Caption,
        Divider,
        Button,
        Container,
        InteractUserMessage,
        ConfigureAgents,
        InteractThread,
        ConfigureModel,
    },
    data() {
        return {
            submitted: false,
            running: false,
        }
    },
    mounted() {
        this.reset()
    },
    unmounted() {
        this.running = false
    },
    methods: {
        start_thread: async function () {
            this.submitted = true
            this.running = true
            await this.generateMessages()
        },
        generateMessages: async function () {
            while (this.running) {
                let agent = getThreadStore().getRandomAgent
                await getThreadStore().queryNextPost(
                    getConfigStore().getModel,
                    agent,
                )
                await new Promise((resolve) =>
                    setTimeout(resolve, _.random(500, 2000)),
                )
                if (getThreadStore().getThread.length > 25) this.running = false
            }
        },
        reset: function () {
            this.submitted = false
            this.running = false

            getThreadStore().reset()
        },
        toggleRunning: function () {
            this.running = !this.running
            if (this.running) this.generateMessages()
        },
        getThreadStore,
        getAgentsStore,
        getConfigStore,
        downloadJSON,
    },
}
</script>
