import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import ellipsis from '../packages/ellipsis/lib/index.esm'

Vue.use(VueRouter)
Vue.use(ellipsis)

const router = new VueRouter({
  base: '/',
  mode: 'hash',
  routes: routes,
})
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
