import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Open from '@/components/Open'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,

    },
    {
      path: '/open',
      name: 'Open',
      component: Open
    }
    
    // { path: '*', component: NotFoundComponent }
  ]
})
