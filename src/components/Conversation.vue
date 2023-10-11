<template>
  <div class="bg-orange-100 p-4 rounded-lg flex flex-col items-start gap-4 min-h-[16rem] max-h-fit">
    <template v-for="item in conversation">
      <Message
          :author="item.label"
          :byUser="item.name === 'user'"
          :text="item.message"
      />
    </template>
  </div>
</template>

<script>

import Message from "@/components/atoms/Message.vue"

export default {
  components: {
    Message
  },
  props: {
    user_message: String,
    conversation: Array,
  }
}
</script>
