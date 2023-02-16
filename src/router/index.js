import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

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
    meta: { requiresStaffOrSuperuser: true },
    children: [
      {
        path: 'aktivni-dogadjaji',
        name: 'admin-active-events',
        component: () => import("@/views/admin/ActiveEvents"),
      },
      {
        path: 'zavrseni-dogadjaji',
        name: 'admin-finished-events',
        component: () => import("@/views/admin/FinishedEvents"),
      },
      {
        path: 'detalji-dogadjaja/:id',
        name: 'admin-event-details',
        component: () => import("@/views/admin/EventDetails"),
      },
      {
        path: 'dodaj-dogadjaj',
        name: 'admin-new-event',
        component: () => import("@/views/admin/AddNewEvent"),
      },
      {
        path: 'kategorije-dogadjaja',
        name: 'admin-event-categories',
        component: () => import("@/views/admin/EventCategories"),
      },
      {
        path: 'pregled-po-osobama',
        name: 'admin-overview-by-person',
        component: () => import("@/views/admin/OverviewByPerson"),
      },
      {
        path: 'pregled-prisutnosti/:id',
        name: 'admin-attendance-details',
        component: () => import("@/views/admin/AttendanceDetails"),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
/************************************ PROTECTION OF ROUTES **************************************/
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresStaffOrSuperuser)) {
    requireStaffOrSuperuser(to, from, next);
  } else {
    next();
  }
});


const isAuthenticated = () => {
  return localStorage.getItem('isAuth') === 'true';
}

const requireStaffOrSuperuser = (to, from, next) => {
  if (isAuthenticated()) {
    next();
  } else {
    next({
      path: '/prijava',
      query: { redirect: to.fullPath }
    });
  }
};
/**************************************************************************************************/

export default router
