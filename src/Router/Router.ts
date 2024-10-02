import { createRouter , createWebHistory } from "vue-router";
import Home from "../view/Home.vue";
import Register from "../view/register.vue";
import Login from "../view/Login.vue";
import { authStore } from "../store/authStore";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            beforeEnter: (to, from, next) => {
                if (authStore().isLogedIn) {
                    next();
                } else {
                    next("/login");
                }
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/register",
            name: "register",
            component: Register
        }
    ]
})

export default router