import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getRoutes } from '@/api/user';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/order',
    /*
    children: [
      {
        path: '/order',
        name: 'order',
        meta: {
          isMenu: true,
          title: "订单列表"
        },
        component: () => import('../views/OrderView.vue')
      },
      {
        path: '/product',
        name: 'product',
        meta: {
          isMenu: true,
          title: "商品列表"
        },
        component: () => import('../views/ProductView.vue')
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          isMenu: true,
          title: "用户列表"
        },
        component: () => import('../views/UserView.vue')
      },
      {
        path: '/role',
        name: 'role',
        meta: {
          isMenu: true,
          title: "角色列表"
        },
        component: () => import('../views/RoleView.vue')
      },
      {
        path: '/auth',
        name: 'auth',
        meta: {
          isMenu: false,
          title: "权限列表"
        },
        component: () => import('../views/AuthView.vue')
      }
    ]
    */
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由拦截
router.beforeEach(async (to, from, next) => {
  // 判断是否登录
  let token:string | null = localStorage.getItem('token');
  if (!token && to.path !== '/login' ){
    next({ name: 'login' });
  } else if (token && to.path !== '/login') {
    if (router.getRoutes().length === 3) {
      // 动态添加路由
      const routesData:any = await getRoutes();
      routesData.data.routes.forEach((item:any) => {
        // component注释中的[request]在渲染的时候会替代成item.view的值;
        const routerObj:RouteRecordRaw = {
          path: item.path,
          name: item.name,
          meta: item.meta,
          component: () => import(/* webpackChunkName: "[request]" */ '../views/'+ item.view +'.vue')
        }
        // vue2 中可以addRoutes一次性注入多个，vue3只能一次注入一个
        router.addRoute("home", routerObj);
      });
      // router.push(to.path);
      next({ ...to, replace: true });
      // replace方法会替代history记录
      // router.replace(to.path);
    } else {
      next()
    }
  } else if (token && to.path === '/login') {
    next({ name: '/' });
  } else {
    next();
  }
})

export default router
