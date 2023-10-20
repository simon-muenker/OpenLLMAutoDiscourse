<template>
  <div class="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 w-full mt-12 text-slate-500">
    <div class="flex gap-4 underline underline-offset-4">
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink :to="{ name: 'information' }">More Information</RouterLink>
    </div>
    <div>
      Simon Münker, University of Trier
    </div>
  </div>
</template>

<script>
import {RouterLink} from "vue-router"

export default {
  components: {RouterLink}
}
</script>