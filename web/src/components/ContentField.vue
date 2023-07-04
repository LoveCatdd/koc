<!-- 模版一 主要信息展示 -->
<template>
  <div class="container content-field ">
    <div class="card "><!--主要窗口模板 若是添加container content-field 则会使透明填充窗口  card不添加是填充底层窗口-->
      <div class="card-body">
        <slot></slot>

      </div>

    </div>
  </div>
  <!-- 渐变美化底部 -->
  <div style="position:fixed;bottom: 0;width:100%;height:30px;
               background: -webkit-linear-gradient(rgb(35, 126, 168), rgb(172, 142, 241)); /* Safari 5.1 - 6.0 */
               background: -o-linear-gradient(rgb(35, 126, 168), rgb(172, 142, 241)); /* Opera 11.1 - 12.0 */
               background: -moz-linear-gradient(rgb(35, 126, 168), rgb(172, 142, 241)); /* Firefox 3.6 - 15 */
               background: linear-gradient(rgb(70, 162, 202), rgb(172, 142, 241)); /* 标准的语法（必须放在最后） */">
  </div>
</template>



<script>
export default {

}
</script>

<style scoped>
/*底层背景设置*/
div.card {
  /* overflow-y: scroll; */
  /*只显示竖向滚动条  auto 随窗口滚动  */
  /* overflow-y: auto; 只显示竖向滚动条  v并且一直有 */
  /* overflow-x: auto; 横向滚动条根据内容自动填充 */
  position: relative;
  border: 20px;
  border-color: white;
  left: 5%;
  top: 70px;
  width: 1200px;
  height: auto;
  /*窗口高度已设定  小于800的自动扩展*/
  max-height: 800px;
  /*最大已设定*/
  transform: (-50%, -50%);
  background-color: #636462;
  border-radius: 25px;
  /* 这里将圆角角度设置为25像素 */
}

/* .scroll-container { */


/* max-height: 800px; */
/* 设置最大高度为视窗高度 */
/* overflow: auto; */
/* overflow: scroll; */
/* 或 overflow: scroll; */
/* }
 */
</style>