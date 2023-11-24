<template>
  <div
      class="container mx-auto flex flex-row items-center justify-around gap-1 fixed bottom-0 left-0 right-0 w-full bg-rose-600 text-rose-100 pt-1.5 sm:pt-3 pb-1 sm:pb-2 px-12 sm:px-8 rounded-t-full"
  >
    <template v-for="link in nav_items">
      <RouterLink
          :to=link.route
          class="relative flex h-full basis-full cursor-pointer flex-col items-center justify-center"
      >
        <component :is="link.icon" class="h-6 w-6 sm:h-8 sm:w-8"></component>
        <span class="text-xs sm:text-sm font-light">
          {{ link.label }}
        </span>
      </RouterLink>
    </template>
  </div>
</template>

<script>
import Container from "@/components/atoms/Container.vue"
import {Bars3BottomRightIcon, ChatBubbleLeftRightIcon} from "@heroicons/vue/24/outline"
import {AdjustmentsVerticalIcon} from "@heroicons/vue/24/solid"

export default {
  components: {
    Bars3BottomRightIcon,
    AdjustmentsVerticalIcon,
    ChatBubbleLeftRightIcon,
    Container
  },
  data() {
    return {
      nav_items: [
        {
          route: {name: 'interact'},
          label: 'Interact',
          icon: ChatBubbleLeftRightIcon
        },
        {
          route: {name: 'customize'},
          label: 'Customize',
          icon: AdjustmentsVerticalIcon
        },
        {
          route: {name: 'more'},
          label: 'More',
          icon: Bars3BottomRightIcon
        }
      ]
    }
  }
}
</script>