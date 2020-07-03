import Vue from 'vue'
import VueRouter from 'vue-router'
import {
    routes
} from "./routes";

Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

import {
    message
} from 'ant-design-vue'

router.beforeEach((to, from, next) => {
    if (to.meta)
        document.title = to.meta.title;
    const token = sessionStorage.getItem('eleToken');
    if (token) next();
    else {
        if (to.path === "/login" || to.path === "/register") next();
        else {
            message.error("请先登录");
            next({
                name: 'Login'
            })
        }
        next();
    }

})

export default router