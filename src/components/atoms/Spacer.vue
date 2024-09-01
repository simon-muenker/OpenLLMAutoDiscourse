<template>
  <div
      :class="[
          size === 'tiny' ? 'h-2' : '',
          size === 'small' ? 'h-4' : '',
          size === 'base' ? 'h-8' : '',
          size === 'large' ? 'h-16' : ''
          ]"
      class="block"
  >
  </div>
</template>
<script>
export default {
  name: 'Spacer',
  props: {
    size: {
      type: String,
      default: 'base',
      validator: (value) => ['tiny', 'small', 'large'].includes(value),
    }
  }
}
</script>