<template>
  <textarea
      ref="self"
      class="grow p-2.5 text-slate-700 bg-slate-100 rounded-md border-0 resize-none"
      @input="update"
  ></textarea>
</template>

<script>
export default {
  props: {
    initialHeight: {
      type: Number,
      default: 72
    }
  },
  mounted() {
    this.resize()
  },
  methods: {
    update() {
      this.resize()
    },
    resize() {
      this.$refs["self"].style.height = this.initialHeight + "px"
      this.$refs["self"].style.height = this.$refs["self"].scrollHeight + "px"
    }
  }
}
</script>