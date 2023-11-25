import {createRouter, createWebHistory} from "vue-router"

import InteractView from "@/views/Interact.vue"
import CustomizeView from "@/views/Customize.vue"
import MoreView from "@/views/More.vue"

import {Bars3BottomRightIcon, ChatBubbleLeftRightIcon} from "@heroicons/vue/24/outline"
import {AdjustmentsVerticalIcon} from "@heroicons/vue/24/solid"

export default createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: "/",
                name: "interact",
                component: InteractView,
                meta: {
                    title: 'Interact',
                    icon: ChatBubbleLeftRightIcon
                },
            },
            {
                path: "/customize",
                name: "customize",
                component: CustomizeView,
                meta: {
                    title: 'Customize',
                    icon: AdjustmentsVerticalIcon
                },
            },
            {
                path: "/more",
                name: "more",
                component: MoreView,
                meta: {
                    title: 'More',
                    icon: Bars3BottomRightIcon
                },
            },
        ],
        scrollBehavior(to, from, savedPosition) {
            return {top: 0}
        }
    }
)
