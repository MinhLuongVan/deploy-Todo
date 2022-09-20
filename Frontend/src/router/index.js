import { createRouter, createWebHistory } from "vue-router";
//  import {useAuthStore} from '../stores/auth'
import Login from "../views/Login/Login.vue";
import Register from "../views/Register/Register.vue";
import Listtodo from "../views/Todos/Listtodo.vue";
import Addtodo from "../views/Todos/Addtodo.vue";
import Updatetodo from "../views/Todos/Updatetodo.vue";
import Listuser from "../views/Users/Listuser.vue";
import Adduser from "../views/Users/Adduser.vue";
import Cookies from 'js-cookie';
import Updateuser from "../views/Users/Updateuser.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/",
    component: Login,
    
  },
  {
    path: "/register",
    component: Register,
   
  },
  {
    path : "/todolist",
    component : Listtodo,
    meta : {
      requiresAuth: true,
    },
    // beforeEnter(to, from, next){
    //   if (to.matched.some((record) => record.meta.requiresAuth)) {
    //     // const authStore = useAuthStore();
    //     if(Cookies.get('token')){
    //       next();
    //     }else{
    //       next('/');
    //     }
    //   }else {
    //   next();
    //   }
    // }
  },
  {
    path: "/addtodo",
    component: Addtodo,
    meta : {
      requiresAuth: true,
    },
    // beforeEnter(to, from, next){
    //   const authStore = useAuthStore()


    //   if (to.matched.some((record) => record.meta.requiresAuth)) {
    //     // const authStore = useAuthStore();
    //     if(Cookies.get('token')){
    //       next();
    //     }else{
    //       next('/');
    //     }
    //   }else {
    //   next();
    //   }
    // }
  },
  {
    path: "/edittodo/:id",
    component: Updatetodo,
  },
   {
     path: "/user",
     component: Listuser,
   },
  {
    path: "/adduser",
    component: Adduser,
  },
  {
    path: "/edituser/:id",
    component: Updateuser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.getToken();
  if (to.matched.some((record) => record.meta.requiresAuth)) {     
      if (Cookies.get('token')) {
          next();
      } else {
          next("/");
      }
  } else {
      next();
  }
});

export default router;




