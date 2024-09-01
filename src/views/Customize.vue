<template>

  <PageHeadline>Customize</PageHeadline>

  <Divider/>

  <CustomizeAddAgent/>

  <Divider/>

  <CustomizeAdaptSetup/>

</template>

<script setup>
import PageHeadline from "@/components/typography/PageHeadline.vue";
import Divider from "@/components/atoms/Divider.vue"

import CustomizeAddAgent from "@/components/CustomizeAddAgent.vue"
import CustomizeAdaptSetup from "@/components/CustomizeAdaptSetup.vue"
</script>