<template>
  <div class="flex gap-3">
    <Textarea
        placeholder="Type a message"
        @update="(text) => message = text"
    />
    <Button @click="submit">
      Post
    </Button>
  </div>
</template>

<script>
import Button from "@/components/atoms/Button.vue"
import Textarea from "@/components/atoms/Textarea.vue"

export default {
  components: {
    Textarea,
    Button,
  },
  data() {
    return {
      message: ""
    }
  },
  methods: {
    submit() {
      this.$emit("submit", this.message)
    }
  }
}
</script>
