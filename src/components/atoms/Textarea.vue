<template>
  <textarea
      v-model="value"
      :placeholder="placeholder"
      :rows="rows"
      class="grow p-2.5 text-slate-700 bg-slate-100 rounded-md border-0"
      @input="$emit('update', value)"
  >
  </textarea>
</template>

<script>
export default {
  props: {
    placeholder: String,
    rows: {
      type: String,
      default: "2"
    },
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