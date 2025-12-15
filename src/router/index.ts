import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomePage from '@/views/CustomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,

      meta: {requiresAuth:false},
      children:[
                {
                  path: '/about',
                  name: 'about',
                  component: () => import('../views/AboutView.vue'),
                },
                {
                  path: '/custom',
                  name: 'Custome',
                  component: CustomePage
                }
      ],
      
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    }
    
  ],
})
router.beforeEach((to,from,next) =>{
  const isAuthenticated = !!localStorage.getItem('token')

  if(to.meta.requiresAuth && !isAuthenticated){
    next({
      name:'login'
    })
  } else if(to.meta.guest && isAuthenticated){
    next({name:'home'})
  } else{
    next()
  }
})
export default router
