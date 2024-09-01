<template>
    <SectionHeadline>Add your custom agent:</SectionHeadline>
    <SectionExcerpt>
        Create a custom agent and add it to the conversation above. Fill in the
        fields below and provide a custom persona. After adding it to the list,
        the agent appears directly in the above selection. The name denotes the
        unique identifier, while the label shows as the screen name. Thus, omit
        the usage of emojis or other special characters in the label name field.
    </SectionExcerpt>

    <Floater class="flex flex-col gap-3">
        <div class="flex flex-col sm:flex-row gap-3">
            <Input
                placeholder="Name"
                @input="
                    (event) => {
                        name = event.target.value
                    }
                "
            />
            <Input
                placeholder="Icon"
                @input="
                    (event) => {
                        icon = event.target.value
                    }
                "
            />
        </div>

        <div class="flex flex-col sm:flex-row gap-3 sm:items-end items-center">
            <Textarea
                class="!bg-slate-100 rounded-lg p-2.5"
                :value="persona"
                placeholder="Add a persona"
                @input="
                    (event) => {
                        persona = event.target.value
                    }
                "
            ></Textarea>
            <Button :disabled="!canAdd" @click="add">
                <UserPlusIcon class="h-8 w-8 text-gray-600" />
            </Button>
        </div>
    </Floater>

    <span class="mt-4 font-bold text-slate-600">Preview:</span>
    <vue-json-pretty :data="agent" />
    <vue-json-pretty :data="{ prompt: prompt }" />
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import _ from 'lodash'

import { UserPlusIcon } from '@heroicons/vue/24/outline'

import SectionHeadline from '@/components/typography/SectionHeadline.vue'
import SectionExcerpt from '@/components/typography/SectionExcerpt.vue'

import Textarea from '@/components/atoms/Textarea.vue'
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'

import { getConfigStore } from '@/stores/config'
import { getAgentsStore } from '@/stores/agents'
import Floater from './atoms/Floater.vue'

export default {
    components: {
        SectionExcerpt,
        SectionHeadline,
        Input,
        Textarea,
        Button,
        Floater,
        VueJsonPretty,
        UserPlusIcon,
    },
    data() {
        return {
            name: '',
            icon: '',
            persona: '',
        }
    },
    computed: {
        agent() {
            return {
                id: _.snakeCase(this.name),
                name: this.name,
                icon: this.icon,
                persona: this.persona,
            }
        },
        prompt() {
            return !this.persona
                ? getConfigStore().getPrompt
                : getConfigStore().getPrompt.replace('{persona}', this.persona)
        },
        canAdd() {
            return this.name && this.icon && this.persona
        },
    },
    methods: {
        agentsStore: getAgentsStore,
        add() {
            if (this.canAdd) {
                getAgentsStore().addAgent(this.agent)

                this.name = ''
                this.icon = ''
                this.persona = ''
            }
        },
    },
}
</script>
