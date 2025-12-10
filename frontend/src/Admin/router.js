import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import AdminLayout from './layouts/AdminLayout.vue'

const routes = [
  {
    path: '/',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('./views/Dashboard.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('./views/Products.vue')
      },
      {
        path: 'products/create',
        name: 'ProductCreate',
        component: () => import('./views/ProductForm.vue')
      },
      {
        path: 'products/:id/edit',
        name: 'ProductEdit',
        component: () => import('./views/ProductForm.vue')
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('./views/Users.vue')
      },
      {
        path: 'pages',
        name: 'Pages',
        component: () => import('./views/Pages.vue')
      },
      {
        path: 'pages/create',
        name: 'PageCreate',
        component: () => import('./views/PageForm.vue')
      },
      {
        path: 'pages/:id/edit',
        name: 'PageEdit',
        component: () => import('./views/PageForm.vue')
      },

      {
        path: 'settings',
        name: 'Settings',
        component: () => import('./views/Settings.vue')
      },
      {
        path: 'menu-navbar',
        name: 'MenuNavbar',
        component: () => import('./views/MenuNavbar.vue')
      },
      {
        path: 'banners',
        name: 'Banners',
        component: () => import('./views/Banners.vue')
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('./views/Categories.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory('/admin'),
  routes
})

// Navigation guard with admin check
let userFetchPromise = null

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Public route: login
  if (to.name === 'Login') {
    // If already logged in as admin, redirect to dashboard
    if (authStore.token && authStore.user && authStore.isAdmin) {
      return next('/')
    }
    return next()
  }

  // Need auth for everything else
  if (to.meta.requiresAuth) {
    if (!authStore.token) {
      return next('/login')
    }
    
    try {
      // Fetch user once if not loaded yet, reuse promise to avoid duplicate requests
      if (!authStore.user) {
        if (!userFetchPromise) {
          userFetchPromise = authStore.fetchUser().finally(() => {
            userFetchPromise = null
          })
        }
        await userFetchPromise
      }
      
      if (!authStore.isAdmin) {
        authStore.logout()
        return next('/login')
      }
      
      return next()
    } catch (error) {
      console.error('Auth check failed:', error)
      authStore.logout()
      return next('/login')
    }
  }

  next()
})

// Add scroll behavior for smooth navigation
router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

export default router

