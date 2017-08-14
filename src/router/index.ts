import Vue from 'vue'
import VueRouter from 'vue-router'
// import Main from '@/components/Main.vue'
import Auth from '../components/Auth.vue'
import AuthSuccess from '../components/AuthSuccess.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Auth },
    { path: '/auth', component: Auth },
    { path: '/success', component: AuthSuccess }
  ]
})
