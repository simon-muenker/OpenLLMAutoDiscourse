<template>
  <div class="flex gap-4 p-3">
    <div>
      <div class="text-3xl p-1 h-12 w-12 text-center">
        {{ icon }}
      </div>
    </div>
    <div>
      <span class="block font-light text-sm mb-1">
        <span class="font-bold pr-1">{{ name }}</span>
        <span class="text-slate-500">@{{ id }}</span>
      </span>
      <template v-if="!text">
        <span class="font-bold animate-pulse">...</span>
      </template>
      <span>
        {{ text }}
      </span>
      <InteractThreadItemMetrics :metrics="metrics" v-if="metrics" />
    </div>
  </div>
</template>
<script>
import InteractThreadItemMetrics from "@/components/InteractThreadItemMetrics.vue"  


export default {
  components: {
    InteractThreadItemMetrics
  },
  props: {
    id: String,
    name: String,
    icon: String,
    text: String,
    metrics: Object
  }
}
</script>
