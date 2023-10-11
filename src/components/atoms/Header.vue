<template>
  <header>
    <h1 class="text-6xl font-extrabold tracking-tight text-slate-800 mb-4">
      <slot name="title"></slot>
    </h1>
    <p class="text-xl font-normal text-slate-600 leading-relaxed">
      <slot name="excerpt"></slot>
    </p>
  </header>
</template>

<script>
export default {}
</script>
