import {createRouter, createWebHistory} from "vue-router"

import HomeView from "@/views/Home.vue"
import InformationView from "@/views/Information.vue"

export default createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: "/",
                name: "home",
                component: HomeView,
                meta: {
                    title: "ReplyRift: AI Agent Conversation",
                },
            },
            {
                path: "/information",
                name: "information",
                component: InformationView,
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
