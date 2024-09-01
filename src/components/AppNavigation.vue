<template>
    <div class="block h-28"></div>
    <div class="fixed z-50 bottom-4 w-full">
        <Container class="w-1/3">
            <nav
                class="flex flex-row justify-evenly items-center gap-4 mx-auto w-full"
            >
                <template v-for="link in routes">
                    <RouterLink
                        :to="link.path"
                        exact-active-class="!text-emerald-500"
                    >
                        <Floater>
                            <component
                                :is="link.meta.icon"
                                class="h-6 w-6 sm:h-8 sm:w-8"
                            ></component>
                        </Floater>
                    </RouterLink>
                </template>
            </nav>
        </Container>
    </div>
</template>

<script>
import Router from '@/router'
import Floater from '@/components/atoms/Floater.vue'
import Container from '@/components/atoms/Container.vue'

export default {
    name: 'AppNavigation',
    components: {
        Floater,
        Container,
    },
    computed: {
        routes() {
            return Router.getRoutes()
        },
    },
}
</script>
