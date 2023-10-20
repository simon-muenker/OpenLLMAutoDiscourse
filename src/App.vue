<template>
  <div class="my-8">
    <Container>
      <RouterView/>
      <PageFooter/>
    </Container>
  </div>
</template>

<script setup>
import {RouterView} from "vue-router"
import Container from "@/components/atoms/Container.vue"
import PageFooter from "@/components/PageFooter.vue"
</script>
