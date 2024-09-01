<template>
    <div class="flex flex-col gap-4 items-start">
        <template v-for="element in agents">
            <Floater
                :id="element.id"
                class="flex gap-4 p-3 cursor-pointe pr-1 sm:pr-3 border-2 border-r-8 border-transparent"
                :class="{
                    '!border-green-400':
                        getThreadStore().getAgents.has(element),
                }"
                @click="() => toggle(element)"
            >
                <div class="text-3xl p-1 h-12 w-12 text-center">
                    {{ element.icon }}
                </div>
                <div>
                    <TextExtraBold class="mr-1">{{
                        element.name
                    }}</TextExtraBold
                    >&nbsp;
                    <Caption>@{{ element.id }}</Caption>
                    <br />
                    <Text> {{ element.summary }} </Text>
                </div>
            </Floater>
        </template>
    </div>
</template>

<script>
import { getAgentsStore } from '@/stores/agents'
import { getThreadStore } from '@/stores/thread'

import Caption from './typography/Caption.vue'
import Text from './typography/Text.vue'
import TextExtraBold from './typography/TextExtraBold.vue'

import Floater from '@/components/atoms/Floater.vue'

export default {
    name: 'ConfigureModel',
    components: {
        Floater,
        Text,
        TextExtraBold,
        Caption,
    },
    data() {
        return {
            agents: getAgentsStore().getAgents,
        }
    },
    methods: {
        getThreadStore,
        toggle: function (agent) {
            getThreadStore().updateAgents(agent)
        },
    },
}
</script>
