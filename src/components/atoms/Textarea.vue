<template>
    <textarea
        ref="self"
        class="bg-transparent grow p-1 text-slate-700 resize-none focus:outline-0"
        @input="update"
    ></textarea>
</template>

<script>
export default {
    name: 'Textarea',
    props: {
        initialHeight: {
            type: Number,
            default: 72,
        },
    },
    mounted() {
        this.resize()
    },
    methods: {
        update() {
            this.resize()
        },
        resize() {
            this.$refs['self'].style.height = this.initialHeight + 'px'
            this.$refs['self'].style.height =
                this.$refs['self'].scrollHeight + 'px'
        },
    },
}
</script>
