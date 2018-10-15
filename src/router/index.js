import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import todolist from '@/pages/todolist'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
