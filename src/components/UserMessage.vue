<template>
  <div class="flex gap-3">
      <textarea
          v-model="message"
          class="grow p-2.5 text-gray-900 bg-gray-50 rounded-md border border-gray-300"
          placeholder="Type a message"
          rows="2"
      >
      </textarea>
    <Button :action="submit">
      Post
    </Button>
  </div>
</template>

<script>
import Button from "@/components/atoms/Button.vue"

export default {
  components: {
    Button,
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.message)
    }
  }
}
</script>
