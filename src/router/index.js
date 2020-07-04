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
    if (to.meta.title)
      document.title = to.meta.title;
    const token = sessionStorage.getItem('token');
    if (token) next();
    else {
      if (to.matched.some(record => record.meta.requireAuth)) {
        if (to.name === 'Login') next();
        else {
            message.error("请先登录");
          next({ name: 'Login' });
        }
      }
      else next();
    }
  })
export default router