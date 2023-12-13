<template>

  <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
    <Textarea
        :value="message"
        placeholder="Type a message"
        @input="event => {message = event.target.value; exampleMessage=0}"
    />
    <Button :disabled="isSubmitDisabled" @click="submit">
      Start Thread
    </Button>
  </div>

  <select
      v-model="exampleMessage"
      :class="[exampleMessage !== 0 ? 'text-slate-700' : '', 'text-slate-400']"
      class="rounded-lg p-2.5 bg-slate-100 cursor-pointer leading-loose"
      @change="_ => message = exampleMessage"
  >
    <option disabled selected value="0">or choose an example</option>
    <option v-for="example in examples" :value="example.message">
      {{ example.name }}
    </option>
  </select>
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
  emits: ["submittedUserMessage"],
  data() {
    return {
      message: "",
      exampleMessage: 0,
      examples: [
        {
          name: 'Republicans Vote Behavior',
          message: 'It\'s funny how whenever people have the opportunity to vote, Republicans do poorly.'
        },
        {
          name: 'Trump Curt Decision',
          message: 'This is a bad decision. Trump incited violence and should be banned. Shame on Colorado.'
        },
      ]
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
