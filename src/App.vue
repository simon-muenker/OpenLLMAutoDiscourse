<template>
  <div class="bg-slate-100 shadow-inner">
    <Container>
      <RouterView/>
    </Container>

    <AppFooter/>
    <AppNavigation />
  </div>
</template>

<script>
import {getConfigStore} from "@/stores/config"

import {RouterView} from "vue-router"
import Container from "@/components/atoms/Container.vue"
import AppNavigation from "@/components/AppNavigation.vue"
import AppFooter from "@/components/AppFooter.vue"

export default {
  name: 'App',
  components: {
    RouterView,
    Container,
    AppFooter,
    AppNavigation,
  },
  mounted() {
    getConfigStore().init()
  }
}
</script>
