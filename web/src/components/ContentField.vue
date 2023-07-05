<!-- 模版一 主要信息展示 -->
<template>
  <div class="container content-field ">
    <div class="card "><!--主要窗口模板 若是添加container content-field 则会使透明填充窗口  card不添加是填充底层窗口-->
      <div class="card-body">
        <slot></slot>

      </div>

    </div>
  </div>

</template>



<script>
export default {

}
</script>

<style scoped>

</style>