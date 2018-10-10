import Vue from 'vue'
import Router from 'vue-router'
import todolist from '@/pages/todolist'
import todemo from '@/pages/demo'
import todemo2 from '@/pages/demo2'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todolist',
      component: todolist
    },
    {
      path: '/demo',
      name: 'demo',
      component: todemo
    },
    {
      path: '/demo2',
      name: 'demo2',
      component: todemo2
    }
  ]
})
