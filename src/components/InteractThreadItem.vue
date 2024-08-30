<template>
  <div class="flex gap-4 text-slate-700 bg-slate-100 rounded-lg p-3 transition-colors">
    <div>
      <div class="text-3xl bg-slate-200 rounded-full p-1 h-12 w-12 text-center">
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
    <div class="mt-2 p-2 bg-rose-100 rounded-md" v-if="metrics">
      <span>metrics</span>
      <template v-for="(preds, label) in metrics">
        <div class="mb-2">
        <span class="block text-sm">{{ label }}</span>
        <template v-for="(pred, name) in preds">
          <div class="flex flex-row mb-1.5">
            <div class="w-full bg-transparent rounded-full">
              <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 py-1 rounded-full" :style="{width: pred * 100 + '%'}"> 
                {{ name.toLowerCase() }} : {{ (pred * 100).toFixed(2) }} % 
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: String,
    name: String,
    icon: String,
    text: String,
    metrics: Object
  }
}
</script>
