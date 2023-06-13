import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import NotFoundView from '../views/error/NotFoundView';
import RankListView from '../views/ranklist/RankListView.vue';
import RecordView from '../views/record/RecordView.vue';
import UserInfoView from '../views/user/info/UserInfoView.vue';
import StoreHouseView from '../views/storehouse/StoreHouseView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/rank-list/',
    name: 'rank_list',
    component: RankListView
  },
  {
    path: '/record/',
    name: 'record',
    component: RecordView
  },
  {
    path: '/user-info/',
    name: 'user_info',
    component: UserInfoView
  },
  {
    path: '/storehouse/',
    name: 'storehouse',
    component: StoreHouseView
  },
  {
    path: '/404/',
    name: '404',
    component: NotFoundView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

