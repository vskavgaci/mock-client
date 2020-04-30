import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import UserCreate from '../views/user/create';
import UserLogin from '../views/user/login';
import UserHome from '../views/user/home';
import Management from '../views/management';
import MockList from '../views/management/mock/list';
import MockCreate from '../views/management/mock/create';
import MockEdit from '../views/management/mock/edit';
import UserSettings from '../views/management/user/settings';
import helper from '../helpers/helpers.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: helper.ifNotAuthenticated,
  },
  {
    path: '/user',
    component: UserHome,
    children: [
      {
        path: 'create',
        name: 'UserCreate',
        beforeEnter: helper.ifNotAuthenticated,
        component: UserCreate
      },
      {
        path: 'login',
        name: 'UserLogin',
        beforeEnter: helper.ifNotAuthenticated,
        component: UserLogin
      }
    ]
  },
  {
    path: '/management',
    component: Management,
    children: [
      {
        path: 'mock/create',
        name: 'MockCreate',
        component: MockCreate,
        beforeEnter: helper.ifAuthenticated
      },
      {
        path: 'mock/list',
        name: 'MockList',
        component: MockList,
        beforeEnter: helper.ifAuthenticated
      },
      {
        path: 'mock/:id',
        name: 'MockEdit',
        component: MockEdit,
        beforeEnter: helper.ifAuthenticated
      },
      {
        path: 'user/settings',
        name: 'UserSettings',
        component: UserSettings,
        beforeEnter: helper.ifAuthenticated
      }
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  routes: routes,
});

export default router;
