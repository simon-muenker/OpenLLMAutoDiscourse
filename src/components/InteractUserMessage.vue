<template>
  <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
    <Textarea
        v-model="message"
        placeholder="Type a message"
    />
    <Button :disabled="isSubmitDisabled" @click="submit">
      Start Thread
    </Button>
  </div>
</template>

<script>
import Button from "@/components/atoms/Button.vue"
import Textarea from "@/components/atoms/Textarea.vue"
import {getThreadStore} from "@/stores/thread"

export default {
  components: {
    Textarea,
    Button,
  },
  data() {
    return {
      message: {
        type: String,
        default: ""
      }
    }
  },
  computed: {
    isSubmitDisabled() {
      return !this.message;
    }
  },
  methods: {
    submit() {
      if (!this.message) return

      getThreadStore().addPost(
          'user',
          'You',
          '🗣',
          this.message
      )

      this.$emit("submittedUserMessage")
    }
  }
}
</script>
