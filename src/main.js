import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './assets/style/common.css'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import axios from './plugin/axios'
Vue.prototype.$axios = axios

Vue.use(Antd)
Vue.use(MavonEditor)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
