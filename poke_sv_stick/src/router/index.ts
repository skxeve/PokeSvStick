import { createRouter, createWebHistory } from "vue-router"
import HelloWorldVue from "../components/pages/HelloWorld.vue"
import TypeTableVue from "../components/pages/TypeTable.vue"
import PokedexVue from "../components/pages/Pokedex.vue"
import TeraCompVue from "../components/pages/TeraComp.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "top",
            component: HelloWorldVue
        },
        {
            path: "/type-table",
            name: "TypeTable",
            component: TypeTableVue
        },
        {
            path: "/pokedex",
            name: "Pokedex",
            component: PokedexVue
        },
        {
            path: "/tera-comp",
            name: "TeraComp",
            component: TeraCompVue
        }
    ]
})

export default router
