<template>
  <div class="lightdark ">
    <div class="center-">
        <div class="card-background" >
          <div class="center- margin-bottom position-">
            <table  class="  table-striped table-hover f1">
              <thead>
                <!-- 表头 -->
                <tr>
                  <th>
                    <p>综合排名</p>
                    <hr />
                  </th>
                  <th>
                    <p >玩家姓名</p>
                    <hr />
                  </th>
                  <th>
                    <p>赛场积分</p>
                    <hr />
                  </th>
                </tr>

                <!-- 排名信息   <font style="color: rgb(255, 255, 255)">-->
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <!-- 分页显示 -->

              </thead>
              
              <tbody>
                <tr class="" v-for="user in users" :key="user.id">
                  <td class="tr-size text-center">
                    <span>{{ num + user.id }}</span>
                  </td>
                  <td class="tr-size ">
                    <img :src="user.photo" alt="" class="img-size" >
                    &nbsp;
                    <span>{{ user.username }}</span>
                  </td>
                  <td class="tr-size text-center">
                      <span >
                        {{ user.rating }}
                      </span>
                  </td>
                </tr>
              </tbody>
            </table>

        <!-- 点击事件在模版之外  实现位置固定 -->

      </div>
      <nav aria-label="..." class="page-size">
        <ul class="pagination" >
            <li class="page-item" @click="click_page(-2)">
                <a class="page-link" href="#">前一页</a>
            </li>
            <li :class="'page-item ' + page.is_active" v-for="page in pages" :key="page.number" @click="click_page(page.number)">
                <a class="page-link" href="#">{{ page.number }}</a>
            </li>
            <li class="page-item" @click="click_page(-1)">
                <a class="page-link" href="#">后一页</a>
            </li>
        </ul>
        </nav>
    </div>
  </div>
</div>
</template>
  

<script>
import { useStore } from "vuex";
import { ref } from 'vue';
import $ from 'jquery';
// import router from "@/router/index";

export default {
  name: 'RankListView',


  components: {
  },
  //上一页,下一页都处于一直加的状态
  setup() {
    const store = useStore();
    let users = ref([]);  //用户
    let current_page = 1;  //当前的页码  默认为1
    let total_users = 0;   //用户 的 数量
    let pages = ref([]);
    let num = ref(0);

    // -2  表示向前移动一页   -1 表示向后移动一
    const click_page = page => {
        if (page === -2) page = current_page - 1;
        else if (page === -1) page = current_page + 1;
        let max_pages = parseInt(Math.ceil(total_users / 10));
        if (page >= 1 && page <= max_pages) {
            num.value = 10 * (page - 1);
            pull_page(page);
        } else {
          num.value = 10 * (current_page - 1);
        }
        console.log(num.value);
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


    const pull_page = (page) => {
      current_page = page;
      $.ajax({
        url: "http://127.0.0.1:8090/user/ranklist/getlist/",
        type: "get",
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        data: {
          page, //页面
        },
        success(resp) {
          console.log(resp);
          users.value = resp.users;
          total_users = resp.users_count;
          update_pages();
        },
        error(resp) {
          console.log(resp);
        }
      })
    }
    
    pull_page(current_page);  //点击传入  当前页码的值
    return {
      users,
      pages,
      current_page,
      click_page,
      num
    }
  }


}
</script>
  
<style scoped>


i {
  color: azure;
  font-size: 35px;
  margin: 10px 10px 10px 10px;
}

.page-size {
  margin-top: 25px;
  float: right;
}

hr {
  color: #fd264f;
  border-width: 2px;
  width: 96%;
}

.img-size {
  height: 70px;
  width: 70px;
}

p {
  text-align: center;
  margin-bottom: 5px;
  margin-top: 5px;
}

.center- {
    display: flex;
    justify-content: center;
    align-content: center;
}
.card-background {
    padding: 20px;
    margin-top: 100px;
    background-color:#242422;

    height: auto;
    width: auto;
}
.f1 {
  color: rgb(255, 255, 255);
  font-size: 25px;
  font-weight: 450;
  font-family: monospace;
  width: auto;
  height: auto;
}

thead {
  color: rgb(255, 255, 255);
  background-color: #2a2827;
}

.tr-size {
  padding: 10px;
  width: 350px;
  background-color: #393941;
}
.text-center {
  text-align: center;
}
.lightdark {
    height: 2000px;
    width: 100%;
    background-color: #312E2B;
}

</style>