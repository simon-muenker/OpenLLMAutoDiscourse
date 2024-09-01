<template>

  <Floater class="mb-4">

    <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
      <Textarea
        :value="message"
        placeholder="type our message"
        @input="event => {message = event.target.value; exampleMessage=0}"
      ></Textarea>
      <Button
            :disabled="isSubmitDisabled"
            @click="submit"
        >
          <PaperAirplaneIcon class="h-10 w-10 text-emerald-600"/>
        </Button>
    </div>

    <div class="flex flex-row gap-3 justify-between items-center">
      <Caption class="select-none self-end">Generated content may be inaccurate or false.</Caption>
    </div>

  </Floater>

  <Caption class="pl-1">or choose an example</Caption>
  <div class="flex flex-row gap-4">

    <Button
        v-for="example in examples"
        @click="() =>  message = example.message"
    >
      <Floater class="italic text-slate-500 text-xs !p-2">
        {{ example.name }}
      </Floater>
    </Button>

    </div>
</template>

<script>
import {PaperAirplaneIcon} from "@heroicons/vue/24/outline"
import Caption from "@/components/typography/Caption.vue"

import Button from "@/components/atoms/Button.vue"
import Textarea from "@/components/atoms/Textarea.vue"
import {getThreadStore} from "@/stores/thread"

import {getExamplePosts} from "@/data/posts"
import Floater from "./atoms/Floater.vue"


export default {
  components: {
    PaperAirplaneIcon,
    Textarea,
    Button,
    Floater,
    Caption
  },
  emits: ["submittedUserMessage"],
  data() {
    return {
      message: "",
      exampleMessage: 0,
      examples: getExamplePosts()
    }
  },
  computed: {
    isSubmitDisabled() {
      return !this.message || getThreadStore().agents.size === 0;
    }
  },
  methods: {
    submit() {
      if (self.isSubmitDisabled) return

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
