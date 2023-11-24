import {createRouter, createWebHistory} from "vue-router"

import InteractView from "@/views/Interact.vue"
import CustomizeView from "@/views/Customize.vue"
import MoreView from "@/views/More.vue"

export default createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: "/",
                name: "interact",
                component: InteractView,
                meta: {
                    title: "ReplyRift: Interact",
                },
            },
            {
                path: "/customize",
                name: "customize",
                component: CustomizeView,
                meta: {
                    title: "ReplyRift: Customize",
                },
            },
            {
                path: "/more",
                name: "more",
                component: MoreView,
                meta: {
                    title: "ReplyRift: More Information",
                },
            },
        ],
        scrollBehavior(to, from, savedPosition) {
            return {top: 0}
        }
    }
)
