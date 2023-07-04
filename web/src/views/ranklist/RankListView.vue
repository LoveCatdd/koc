<template>
    <table style="width: 1100px;position: relative;left:20px; " class="  table-striped table-hover f1" >
      <thead >
        <!-- 表头 -->
      <tr>
        <th><font style="color: rgb(162, 219, 96);font-size: 30px;">综合排名</font></th>
        <th><font style="color: rgb(162, 219, 96);font-size: 30px;">玩家姓名</font></th>
        <th><font style="color: rgb(162, 219, 96);font-size: 30px;">赛场积分</font></th>
      </tr>
      <!-- 排名信息   <font style="color: rgb(255, 255, 255)">-->
      <tr>
        <td>1</td>
        <td>v地方</td>
        <td>3543453</td>
      </tr>
      <!-- 分页显示 -->
    
      </thead>
      <!-- <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>
          <img :src="user.photo" alt="" class="record-user-photo">
          &nbsp;
          <span class="record-user-username">{{ user.username }}</span>
        </td>
        <td>
          {{ user.rating }}
        </td>
      </tr>
      </tbody> -->
    </table>

  <!-- 点击事件在模版之外  实现位置固定 -->
  <div style="position: absolute;left:1200px;top:800px;">
      <nav aria-label="...">
      <ul class="pagination" style="float: right">
        <li class="page-item" @click="click_page(-2)">
          <span class="page-link">前一页</span>
        </li>
        <li :class="'page-item '+page.is_active" v-for="page in pages" :key="page.number"
            @click="click_page(page.number)">
          <a class="page-link" href="#">{{ page.number }}</a>
        </li>
        <li class="page-item" @click="click_page(-1)">
          <a class="page-link" href="#">后一页</a>
        </li>
      </ul>
    </nav>
   </div>
</template>
  
  <script>
  // import ContentBase from '@/components/ContentBase.vue';
  // 以下为新增导入
import {useStore} from "vuex";
import {ref} from 'vue';
import $ from 'jquery';
// import router from "@/router/index";

  export default {
      name: 'RankListView',

      components: {
          // ContentBase,
      },

      setup() {
    const store = useStore();   
    let users = ref([]);  //用户
    let current_page = 1;  //当前的页码  默认为1
    let total_users = 0;   //用户 的 数量
    let pages = ref([]);  
    let test_page =1; 

    // -2  表示向前移动一页   -1 表示向后移动一
    const click_page = page => {
      if (page === -2)
       {
        page = current_page - 1;  //判断是否执行相应的加减
        // document.write("测试测试");  //测试成功
       }
      if (page === -1) 
      {
        page = current_page + 1;  //后一页
        pull_page(page);
       
        
      }
      let max_pages = Math.ceil(total_users / 10);  //每页展示十个用户

      if (page >= 1 && page <= max_pages) {  //判断页码是否在限制内  并输出
        pull_page(page);   
      }
    }

    const update_pages = () => {
      let max_pages = Math.ceil(total_users / 10);  //每页最大存储10个用户的信息量
      let new_pages = [];
      for (let i = current_page - 2; i <= current_page + 2; i++) {
        if (i >= 1 && i <= max_pages) {
          new_pages.push({
            number: i,
            is_active: i === current_page ? "active" : "",
          });
        }
      }
      pages.value = new_pages;
    }
    //实现页面插入用户信息  并排行


    const pull_page = page => {
      current_page = page;
      $.ajax({
        url: "https://app5293.acapp.acwing.com.cn/api/ranklist/getlist/",
        data: {
          page,  //页面

        },
        type: "get",
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          users.value = resp.users;
          total_users = resp.users_count;
          update_pages();
        },
        //用户排名信息
        // user_information:
        // {
        //     user_index,

        // },
      })
    }
    
    pull_page(current_page);  //点击传入  当前页码的值
    return {
      users,
      pages,
      current_page,
      click_page,
      // updateOutput,  //返回函数
      test_page,    //测试 页码输出
    }
  }

  
}
  </script>
  
  <style>
  /* 文字样式 */
   .f1
   {
    color: rgb(255, 255, 255);
    font-size: 25px;  /*字体大小*/
    font-weight: 450;  /*字体粗细*/
   }
   thead
   {
    color: rgb(255, 255, 255);
    background-color: #636462;  
    border-radius: 25px; /* 这里将圆角角度设置为25像素 */
   }
  </style>