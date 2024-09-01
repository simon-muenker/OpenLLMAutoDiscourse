<template>
    <div class="block h-16"></div>
    <Container>
        <div
            class="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 text-sm text-slate-400"
        >
            <a href="https://www.twon-project.eu/" target="_blank">
                TWON - TWin of Online Social Networks
            </a>
            <a
                class="text-slate-600"
                href="https://github.com/simon-muenker/TWON-Threads"
                target="_blank"
            >
                Github
            </a>
            <a href="https://www.linkedin.com/in/simon-muenker" target="_blank">
                Simon Münker, University of Trier
            </a>
        </div>
    </Container>
</template>

<script>
import Container from '@/components/atoms/Container.vue'

export default {
    name: 'AppFooter',
    components: {
        Container,
    },
}
</script>
