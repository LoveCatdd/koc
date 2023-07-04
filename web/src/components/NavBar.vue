<template>
  <div v-if="route_name === 'login' || route_name === 'register'"></div>
  <nav v-else class="navbar navbar-expand-lg bg-dark navbar-dark">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }">King of Chess</router-link>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :class="route_name === 'home' ? 'nav-link active' : 'nav-link'" aria-current="page"
              :to="{ name: 'home' }">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link :class="route_name === 'rank_list' ? 'nav-link active' : 'nav-link'"
              :to="{ name: 'rank_list' }">排行榜</router-link>
          </li>
          <li class="nav-item">
            <router-link :class="route_name === 'storehouse' ? 'nav-link active' : 'nav-link'"
              :to="{ name: 'storehouse' }">仓库</router-link>
          </li>
          <li class="nav-item">
            <router-link :class="route_name === 'record' ? 'nav-link active' : 'nav-link'"
              :to="{ name: 'record' }">棋谱</router-link>
          </li>
          <li class="nav-item">
            <router-link :class="route_name === 'pk' ? 'nav-link active' : 'nav-link'"
              :to="{ name: 'pk' }">PK</router-link>
          </li>
          <li class="nav-item">
            <router-link :class="route_name === 'friendslist' ? 'nav-link active' : 'nav-link'"
              :to="{ name: 'friendslist' }">好友</router-link>
          </li>
          <li class="nav-item">
            <router-link :class="route_name === 'rule' ? 'nav-link active' : 'nav-link'"
              :to="{ name: 'rule' }">规则</router-link>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="$store.state.user.is_login">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              {{ $store.state.user.username }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" :to="{ name: 'user_info' }">个人中心</router-link>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#" @click="logout">退出</a></li>
            </ul>
          </li>
        </ul>

        <ul class="navbar-nav" v-else-if="!$store.state.user.pulling_info">
          <li class="nav-item">
            <router-link :class="route_name === 'pk' ? 'nav-link active' : 'nav-link'"
              :to="{ name: 'login' }">登录</router-link>
          </li>
          <li class="nav-item">
            <router-link :class="route_name === 'pk' ? 'nav-link active' : 'nav-link'"
              :to="{ name: 'register' }">注册</router-link>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';

export default {
  name: 'NavBar',
  components: {
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    let route_name = (computed(() => route.name));
    const logout = () => {
      store.dispatch("logout");
    };
    return {
      route_name,
      logout,
    }
  }

}

</script>

<style scoped>
div.center {
  font-size: 24px;
  margin-right: 0px;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 15px 0px 0px 0px;
  background-color: #272522;
}
</style>