import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotFoundView from '../views/error/NotFoundView';
import RankListView from '../views/ranklist/RankListView.vue';
import RecordView from '../views/record/RecordView.vue';
import UserInfoView from '../views/user/info/UserInfoView.vue';
import PkView from '../views/pk/PkView.vue';
import RuleView from '../views/rule/RuleView';
import FriendsListView from '../views/friends/FriendsListView';
import LoginView from '../views/user/account/login/LoginView.vue';
import RegisterView from '../views/user/account/register/RegisterView.vue';
import store from "../store/index";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/rank-list/',
    name: 'rank_list',
    component: RankListView,
    meta: {
      requestAuth: false
    }
  },
  {
    path: '/record/',
    name: 'record',
    component: RecordView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/user-info/',
    name: 'user_info',
    component: UserInfoView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/pk/',
    name: 'pk',
    component: PkView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/rule/',
    name: 'rule',
    component: RuleView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/friendslist/',
    name: 'friendslist',
    component: FriendsListView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/login/',
    name: 'login',
    component: LoginView,
    meta: {
      requestAuth: false
    }
  },
  {
    path: '/register/',
    name: 'register',
    component: RegisterView,
    meta: {
      requestAuth: false
    }
  },
  {
    path: '/404/',
    name: '404',
    component: NotFoundView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/:catchAll(.*)/',
    redirect: '/404/'
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requestAuth && !store.state.user.is_login) {
    next({ name: "login" });
  } else {
    next();
  }
})


export default router

