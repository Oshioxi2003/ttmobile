import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'Home', component: () => import('./views/Home.vue') },
      { path: 'products', name: 'Products', component: () => import('./views/Products.vue') },
      { path: 'products/:id', name: 'ProductDetail', component: () => import('./views/ProductDetail.vue') },
      { path: 'collections/:slug', name: 'Collection', component: () => import('./views/Products.vue') },
      { path: 'pages/:slug(.*)*', name: 'Page', component: () => import('./views/Page.vue') },
      { path: 'policies/:slug(.*)*', name: 'Policy', component: () => import('./views/Page.vue') },
      { path: 'checkout', name: 'Checkout', component: () => import('./views/Checkout.vue'), meta: { requiresAuth: true } },
      { path: 'profile', name: 'Profile', component: () => import('./views/Profile.vue'), meta: { requiresAuth: true } },
      { path: 'wishlist', name: 'Wishlist', component: () => import('./views/Wishlist.vue'), meta: { requiresAuth: true } }
    ]
  },
  { path: '/login', name: 'Login', component: () => import('./views/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('./views/Register.vue') },
  // Optional catch-all: redirect anything unknown to home
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Simple auth guard using localStorage token
router.beforeEach((to, from, next) => {
  if (to.meta?.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      return next({ name: 'Login', query: { redirect: to.fullPath } })
    }
  }
  next()
})

export default router

