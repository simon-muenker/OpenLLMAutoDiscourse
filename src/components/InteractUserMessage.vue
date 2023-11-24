<template>
  <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
    <Textarea
        placeholder="Type a message"
        @update="(text) => message = text"
    />
    <Button @click="submit">
      Start Thread
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
