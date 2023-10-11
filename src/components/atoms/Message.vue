<template>
  <div
      class="text-slate-700 rounded-lg p-3"
      v-bind:class="(byUser)?'bg-green-200':'bg-slate-50'"
  >
    <span class="block font-light text-xs mb-1">
      {{ author }}
    </span>
    <template v-if="!text">
      <span class="font-bold animate-pulse">...</span>
    </template>
    <span class="sm:text-lg">
      {{ text }}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    author: String,
    text: String,
    byUser: Boolean
  }
}
</script>
