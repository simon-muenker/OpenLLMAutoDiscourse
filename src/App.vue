<template>
  <div class="my-8">
    <Container>
      <RouterView/>

      <div class="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 w-full mt-8 text-slate-500">
        <div class="flex gap-4 underline underline-offset-4">
          <RouterLink :to="{ name: 'home' }">Home</RouterLink>
          <RouterLink :to="{ name: 'information' }">More Information</RouterLink>
        </div>
        <div>
          Simon Münker, University of Trier
        </div>
      </div>

    </Container>
  </div>
</template>

<script setup>
import {RouterView, RouterLink} from "vue-router"
import Container from "@/components/atoms/Container.vue"
</script>
