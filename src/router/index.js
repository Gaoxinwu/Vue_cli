import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import homepage from '@/pages/homePage.vue'
import todolist from '@/pages/todolist'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path:'/todo',
      name:'todolist',
      component:todolist
    }
  ]
})
