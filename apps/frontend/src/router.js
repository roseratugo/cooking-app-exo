import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import AllRecipe from './pages/AllRecipe.vue';
import Recipes from './pages/Recipes.vue';
import Connexion from './pages/Connexion.vue';
import Sign from './pages/Sign.vue';
import Account from './pages/Account.vue';
import UpdateRecipe from './pages/UpdateRecipe.vue';
import AddRecipe from './pages/AddRecipe.vue';
import UpdateMdp from './pages/UpdateMdp.vue';
import NewMdp from './pages/NewMdp.vue';
import FavoriteRecipe from './pages/FavoriteRecipe.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/allrecipe',
        name: 'AllRecipe',
        component: AllRecipe,
    },
    {
        path: '/recipes/:id',
        name: 'Recipes',
        component: Recipes,
        props: true
    },
    {
        path: '/connexion',
        name: 'Connexion',
        component: Connexion,
    },
    {
        path: '/sign',
        name: 'Sign',
        component: Sign,
    },
    {
        path: '/account',
        name: 'Account',
        component: Account,
    },
    {
        path: '/updaterecipe/:id',
        name: 'updaterecipe',
        component: UpdateRecipe,
    },
    {
        path: '/addrecipe',
        name: '/addrecipe',
        component: AddRecipe,
        meta: {
            requiresAuth: true 
          }
    },
    {
        path: '/updatemdp',
        name: '/updatemdp',
        component: UpdateMdp,
    },
    {
        path: '/newmdp/:id',
        name: '/newmdp',
        component: NewMdp,
    },
    {
        path: '/favoriterecipe',
        name: '/favoriterecipe',
        component: FavoriteRecipe,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const token = localStorage.getItem('userToken');
      if (!token) {
        next('/connexion');
      } else {
        next();
      }
    } else {
      next();
    }
  });

export default router;
