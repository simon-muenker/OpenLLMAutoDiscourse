<template>
  <textarea
      ref="self"
      v-model="value"
      :placeholder="placeholder"
      class="grow p-2.5 text-slate-700 bg-slate-100 rounded-md border-0 resize-none"
      @input="update"
  >
  </textarea>
</template>

<script>
export default {
  props: {
    defaultValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    initialHeight: {
      type: Number,
      default: 72
    }
  },
  data() {
    return {
      value: this.defaultValue
    }
  },
  mounted() {
    this.resize()
  },
  methods: {
    update() {
      this.resize()
      this.$emit('update', this.value)
    },
    resize() {
      this.$refs["self"].style.height = this.initialHeight + "px"
      this.$refs["self"].style.height = this.$refs["self"].scrollHeight + "px"
    },
    reset() {
      this.value = this.defaultValue
    }
  }
}
</script>