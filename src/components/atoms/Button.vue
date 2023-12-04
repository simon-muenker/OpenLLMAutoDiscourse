<template>
  <button
      :class="[
          'font-medium sm:text-lg text-white',
          'px-6 py-3 rounded-full bg-sky-500',
          'hover:opacity-60',
          'disabled:opacity-25 disabled:cursor-not-allowed',
          'transition-opacity',
      ]"
  >
    <slot></slot>
  </button>
</template>
