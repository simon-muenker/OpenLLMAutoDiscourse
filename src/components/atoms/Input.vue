<template>
  <input
      v-model="value"
      :placeholder="label"
      class="grow block rounded-lg p-2.5 text-slate-700 bg-slate-100"
      type="text"
      @input="$emit('update', value)"
  />
</template>

<script>
export default {
  props: {
    label: String,
    defaultValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      value: this.defaultValue
    }
  },
  methods: {
    reset() {
      this.value = this.defaultValue
    }
  }
}
</script>