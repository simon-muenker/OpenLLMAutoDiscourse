<template>
    <div class="flex gap-4 p-3">
        <div class="text-3xl p-1 text-center">
            {{ icon }}
        </div>
        <div class="grow">
            <TextExtraBold class="mr-1">{{ name }}</TextExtraBold>
            <Caption>@{{ id }}</Caption>
            <br />
            <Text>{{ text }}</Text>
            <InteractThreadItemMetrics :metrics="metrics" v-if="metrics" />
        </div>
    </div>
</template>
<script>
import Caption from './typography/Caption.vue'
import Text from './typography/Text.vue'
import TextExtraBold from './typography/TextExtraBold.vue'

import InteractThreadItemMetrics from '@/components/InteractThreadItemMetrics.vue'

export default {
    components: {
        InteractThreadItemMetrics,
        Text,
        TextExtraBold,
        Caption,
    },
    props: {
        id: String,
        name: String,
        icon: String,
        text: String,
        metrics: Object,
    },
}
</script>
