<template>
  <div class="my-8 pb-20">
    <Container>
      <RouterView/>
      <PageFooter/>
    </Container>
  </div>
  <PageNavigation />
</template>

<script setup>
import {RouterView} from "vue-router"
import Container from "@/components/atoms/Container.vue"
import PageFooter from "@/components/PageFooter.vue"
import PageNavigation from "@/components/PageNavigation.vue"
</script>
