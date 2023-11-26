<template>
  <div
      class="container mx-auto flex flex-row items-center justify-around gap-1 fixed bottom-0 left-0 right-0 w-full bg-rose-600 pt-1.5 sm:pt-3 px-12 rounded-t-full"
  >
    <template v-for="link in routes">
      <RouterLink
          :to=link.path
          class="relative flex h-full basis-full flex-col items-center justify-center cursor-pointer text-rose-300 mx-4 pb-1 sm:pb-2 border-b-2 border-rose-600 hover:text-rose-100 hover:shadow-2xl transition-all"
          exact-active-class="!text-rose-100 !border-rose-100"
      >
        <component :is="link.meta.icon" class="h-6 w-6 sm:h-8 sm:w-8"></component>
        <span class="text-xs sm:text-sm font-light">
          {{ link.meta.title }}
        </span>
      </RouterLink>
    </template>
  </div>
</template>

<script>
import Router from "@/router"

export default {
  computed: {
    routes() {
      return Router.getRoutes()
    }
  }
}
</script>