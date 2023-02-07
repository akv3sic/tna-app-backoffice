import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // auth
  {
    path: '/prijava',
    name: 'login',
    component: () => import("@/views/auth/Login")
  },
  {
    path: '/resetiranje-lozinke',
    name: 'reset-password',
    component: () => import("@/views/auth/ResetPassword")
  },
  
  /************************************/
  /********* administracija ***********/
  /************************************/
  {
    path: '/admin',
    redirect: '/admin/aktivni-dogadjaji',
    component: () => import("@/views/admin/Home"),
    meta: {  },
    children: [
      {
        path: 'aktivni-dogadjaji',
        name: 'admin-events',
        component: () => import("@/views/admin/ActiveEvents"),
      },
      {
        path: 'dodaj-dogadjaj',
        name: 'admin-new-event',
        component: () => import("@/views/admin/AddNewEvent"),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
