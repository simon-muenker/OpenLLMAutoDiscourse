<template>
    <div
        class="rounded-xl bg-white shadow-xl p-3 hover:bg-slate-50 hover:drop-shadow-xl transition-all"
    >
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Floater',
}
</script>
