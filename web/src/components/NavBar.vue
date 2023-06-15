<template>
 <nav v-if="route_name !== 'pk'"  class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container">
    <router-link class="navbar-brand" :to="{name: 'home'}">King of Chess</router-link>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link :class=" route_name === 'home' ? 'nav-link active' : 'nav-link'" aria-current="page" :to="{name: 'home'}">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link :class=" route_name === 'rank_list' ? 'nav-link active' : 'nav-link'" :to="{name: 'rank_list'}">排行榜</router-link>
        </li>
        <li class="nav-item">
          <router-link :class=" route_name === 'storehouse' ? 'nav-link active' : 'nav-link'" :to="{name: 'storehouse'}">仓库</router-link>
        </li>
        <li class="nav-item">
          <router-link :class=" route_name === 'record' ? 'nav-link active' : 'nav-link'" :to="{name: 'record'}">棋谱</router-link>
        </li>
        <li class="nav-item">
          <router-link :class=" route_name === 'pk' ? 'nav-link active' : 'nav-link'" :to="{name: 'pk'}">PK</router-link>
        </li>
    </ul>

    <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            lpxl
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
                <router-link class="dropdown-item" :to="{name: 'user_info'}">个人中心</router-link>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">退出</a></li>
          </ul>
        </li>
      </ul>

    </div>
  </div>
</nav>
<div v-else class="center navbar-brand bg-dark navbar-dark navbar navbar-expand-lg">
    King of Chess
</div>
</template>

<script>
import { computed } from 'vue';
import { useRoute} from 'vue-router'
export default {
    name: 'NavBar',
    components: {

    },
    setup() {
      const route = useRoute();
      let route_name = (computed(() => route.name));

      return {
        route_name
      }
    }

  }

</script>

<style scoped>
div.center {
  margin-right: 0px;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 8px 0px 8px 0px;
}
</style>