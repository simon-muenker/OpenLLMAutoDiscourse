<template>

  <div class="flex gap-2 items-center">
    <div class="text-4xl bg-blue-100 rounded-full p-2 h-16 w-16 text-center">
      {{ post.icon }}
    </div>
    <div>
      <span class="block text-xl">{{ post.name }}</span>
      <span class="block text-slate-500">@{{ post.id }}</span>
    </div>
  </div>

  <p class="text-lg">
    {{ post.message }}
  </p>

  <div class="text-slate-500">
    {{ timestamp }}
    <span> · </span>
    <span class="text-slate-700">{{ replies.length }}</span> Replies
  </div>

  <hr class="w-full h-0.5 mx-auto my-1 bg-slate-200 border-0 rounded sm:my-2"/>

  <template v-for="item in replies">
    <ThreadItem
        :id="item.id"
        :name="item.name"
        :icon="item.icon"
        :text="item.message"
    />
  </template>
</template>

<script>
import _ from "lodash"

import ThreadItem from "@/components/InteractThreadItem.vue"

import {getFormattedDate} from "@/common"

export default {
  components: {
    ThreadItem
  },
  props: {
    user_message: String,
    thread_items: Array,
  },
  computed: {
    post() {
      return _.slice(this.thread_items, 0, 1)[0]
    },
    replies() {
      return _.slice(this.thread_items, 1)
    },
    timestamp() {
      return getFormattedDate()
    }
  }
}
</script>
