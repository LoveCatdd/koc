<template>
 <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container">
    <a class="navbar-brand" href="#">King of Chess</a>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">首页</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">排行榜</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">仓库</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">棋谱</a>
        </li>
    </ul>

    <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            lpxl
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
                <a class="dropdown-item" href="#">我的Bot</a>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">退出</a></li>
          </ul>
        </li>
      </ul>

    </div>
  </div>
</nav>
</template>

<script>
export default {
    name: 'NavBar',
}
</script>

<style>

</style>