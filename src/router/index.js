import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Time & Attendance System' }
  },
  // auth
  {
    path: '/prijava',
    name: 'login',
    component: () => import("@/views/auth/Login"),
    meta: { title: 'Prijava' }
  },
  {
    path: '/resetiranje-lozinke',
    name: 'reset-password',
    component: () => import("@/views/auth/ResetPassword"),
    meta: { title: 'Resetiranje lozinke' }
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
        meta: { title: 'Aktivni događaji' }
      },
      {
        path: 'zavrseni-dogadjaji',
        name: 'admin-finished-events',
        component: () => import("@/views/admin/FinishedEvents"),
        meta: { title: 'Završeni događaji' }
      },
      {
        path: 'detalji-dogadjaja/:id',
        name: 'admin-event-details',
        component: () => import("@/views/admin/EventDetails"),
        meta: { title: 'Detalji događaja' }
      },
      {
        path: 'dodaj-dogadjaj',
        name: 'admin-new-event',
        component: () => import("@/views/admin/AddNewEvent"),
        meta: { title: 'Dodaj novi događaj' }
      },
      {
        path: 'kategorije-dogadjaja',
        name: 'admin-event-categories',
        component: () => import("@/views/admin/EventCategories"),
        meta: { title: 'Kategorije događaja' }
      },
      {
        path: 'pregled-po-osobama',
        name: 'admin-overview-by-person',
        component: () => import("@/views/admin/OverviewByPerson"),
        meta: { title: 'Pregled po osobama' }
      },
      {
        path: 'pregled-prisutnosti/:id',
        name: 'admin-attendance-details',
        component: () => import("@/views/admin/AttendanceDetails"),
        meta: { title: 'Pregled prisutnosti' }
      },
      {
        path: 'postavke',
        name: 'admin-settings',
        component: () => import("@/views/admin/Settings"),
        meta: { title: 'Postavke' }
      }
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
