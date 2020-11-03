import Vue from 'vue'
import VueRouter from 'vue-router'
import {globAcceso} from '../main'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/crud',
    name: 'Crud',
    component: () => import(/* webpackChunkName: "about" */ '../views/CRUD.vue'),
    //meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {

    if(to.name !=='Home' && !globAcceso.valor)
    {
       next({name: 'Home'});
    }
    else 
    {
      next()
    }

});



export default router
