<template>
  <button
      class="font-medium text-white px-6 py-3 rounded-lg bg-green-500"
      @click="action"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    action: Function,
  }
}
</script>