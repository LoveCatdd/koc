<template>
  <NavBar />
  <router-view />
</template>

<script>
/* 
  导入boootstrap css 和 js 包
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "./components/NavBar.vue"




export default ({
  name: 'App',
  components: {
    NavBar
  },
  setup() {

  },
})
</script>


<style></style>