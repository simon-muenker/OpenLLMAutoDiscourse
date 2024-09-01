<template>
  <div
      :class="[
          isLarge ? 'max-w-[1440px]' : 'max-w-[640px]',
          fillHeight ? 'min-h-svh': '',
          ]"
      class="container mx-auto px-3"
  >
    <div class="flex flex-col gap-3">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Container',
  props: {
    isLarge: {
      type: Boolean,
      default: false,
    },
    fillHeight: {
      type: Boolean,
      default: false,
    }
  }
}
</script>