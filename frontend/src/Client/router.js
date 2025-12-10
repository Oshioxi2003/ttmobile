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
      
      // Static pages with custom layouts
      { path: 'pages/about-us', name: 'AboutUs', component: () => import('./views/AboutUs.vue') },
      { path: 'pages/privacy-policy', name: 'PrivacyPolicy', component: () => import('./views/PrivacyPolicy.vue') },
      { path: 'pages/shipping-policy', name: 'ShippingPolicy', component: () => import('./views/ShippingPolicy.vue') },
      { path: 'pages/refund-policy', name: 'RefundPolicy', component: () => import('./views/RefundPolicy.vue') },
      
      // Dynamic pages from database
      { path: 'pages/:slug(.*)*', name: 'Page', component: () => import('./views/Page.vue') },
      { path: 'policies/:slug(.*)*', name: 'Policy', component: () => import('./views/Page.vue') },
      
      // Cart
      { path: 'cart', name: 'Cart', component: () => import('./views/Checkout.vue') },
      
      { path: 'profile', name: 'Profile', component: () => import('./views/Profile.vue'), meta: { requiresAuth: true } },
      { path: 'wishlist', name: 'Wishlist', component: () => import('./views/Wishlist.vue') }
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

