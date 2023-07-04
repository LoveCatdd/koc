<template>
  <ContentField>
    <body class="lightdark"></body>
    <!-- 可以继承自table -->
    <table style="width: 1100px;" class=" table-striped table-hover ">
      <thead>
      <tr >
        <th class="font-title">A</th>
        <th class="font-title">B</th>
        <th class="font-title">对战结果</th>
        <th class="font-title">对战时间</th>
        <th class="font-title">查看回放步骤</th>
      </tr>

      <tr class="font-content">
        <td>play1</td>
        <td>play2</td>
        <td>winner: B</td>
        <td>2023-5-23 | 15:34</td>
        <td><a class="aa" href="#">详情</a></td>
      </tr>
      <tr class="font-content">
        <td>play3</td>
        <td>play4</td>
        <td>winner: A</td>
        <td>2023-8-12 | 19:20</td>
        <td><a class="aa" href="#">详情</a></td>
      </tr>
      <tr class="font-content">
        <td>play5</td>
        <td>play6</td>
        <td>winner: B</td>
        <td>2023-9-30 | 05:04</td>
        <td><a class="aa" href="#">详情</a></td>
      </tr>
      <tr class="font-content">
        <td>play7</td>
        <td>play8</td>
        <td>winner: A</td>
        <td>2023-4-02 | 15:30</td>
        <td><a class="aa" href="#">详情</a></td>
      </tr>
      <tr class="font-content">
        <td>play9</td>
        <td>play10</td>
        <td>winner: B</td>
        <td>2023-5-23 | 18:24</td>
        <td><a class="aa" href="#">详情</a></td>
      </tr>
      <tr class="font-content">
        <td>play11</td>
        <td>play12</td>
        <td>winner: A</td>
        <td>2023-1-29 | 03:34</td>
        <td ><a class="aa" href="#" >详情</a></td>
      </tr>



      </thead>
      <tbody>
      <tr v-for="record in records" :key="record.record.id">
        <td>
          <img :src="record.a_photo" alt="" class="record-user-photo">
          &nbsp;
          <span class="record-user-username">{{ record.a_username }}</span>
        </td>
        <td>
          <img :src="record.b_photo" alt="" class="record-user-photo">
          &nbsp;
          <span class="record-user-username">{{ record.b_username }}</span>
        </td>
        <td>
          {{ record.result }}
        </td>
        <td>
          {{ record.record.createTime }}
        </td>
        <td>
          <button @click="open_record_content(record.record.id)" type="button" class="btn btn-secondary">查看录像
          </button>
        </td>
      </tr>
      </tbody>

    </table>
    

  </ContentField>
</template>
  
  <script>
  // import ContentBase from '@/components/ContentBase.vue';
  // 以下为新添加
import ContentField from "@/components/ContentField.vue";

  export default {
      name: 'RecordView',
      components: {
          // ContentBase,
          ContentField,
      }
  }
  </script>
  


  <style>
.font-title
{
 color: rgb(162, 219, 96);
 font-size: 25px;
}
</style>
<!-- 展示信息的样式 -->
<style>   
   .font-content
   {
    color: rgb(255, 255, 255);
    font-size: 30px;  /*字体大小*/
    font-weight: 450;  /*字体粗细*/
   }
/* 超链接 样式设定 */
</style>

<style>
/* 回放详情 */
.aa{
		/*祛除连接下划线*/
		text-decoration: blink;
		background-color: rgb(71, 139, 211);
		margin: 0px;
		padding: 8px;
		font-size:18px;
	}
	.aa:link{
		/*未点击之前为白色*/
		color: rgb(255, 255, 255);
	}.aa:visited{
		/*点击为白色*/
		color: rgb(237, 198, 81);
   }
	.aa:hover{
		/*鼠标置于链接上时 字体颜色为黑色，背景为白色*/
		background-color: rgb(204, 235, 81);  /*标题 颜色设置*/
		color: black;
	}
</style>