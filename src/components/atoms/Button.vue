<template>
    <button
        :class="[
            'cursor-pointer',
            'hover:opacity-60 transition-opacity',
            'disabled:opacity-40 disabled:cursor-not-allowed',
        ]"
    >
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'Button',
}
</script>
