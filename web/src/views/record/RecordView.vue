<template>
  <ContentField>

    <body class="lightdark"></body>
    <!-- 可以继承自table -->
    <table style="width: 1100px;" class=" table-striped table-hover ">
      <thead>
        <tr>
          <th class="font-title">A</th>
          <th class="font-title">B</th>
          <th class="font-title">对战结果</th>
          <th class="font-title">对战时间</th>
          <th class="font-title">查看回放步骤</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records" :key="record.record.id">
          <td>
            <img :src="record.a_photo" alt="" class="record-user-photo" style="height: 50px;">
            &nbsp;
            <span class="record-user-username">{{ record.a_username }}</span>
          </td>
          <td>
            <img :src="record.b_photo" alt="" class="record-user-photo" style="height: 50px;">
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
  <div style="position: absolute;left:1200px;top:800px;">
    <nav aria-label="...">
      <ul class="pagination" style="float: right">
        <li class="page-item" @click="click_page(-2)">
          <span class="page-link">前一页</span>
        </li>
        <li :class="'page-item ' + page.is_active" v-for="page in pages" :key="page.number"
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
// 以下为新添加
import ContentField from "@/components/ContentField.vue";
import { useStore } from "vuex";
import { ref } from 'vue';
import $ from 'jquery';
export default {
  name: 'RecordView',
  components: {
    // ContentBase,
    ContentField,
  },

  setup() {
    const store = useStore();
    let records = ref([]);
    let current_page = 1;
    let total_records = 0;
    let pages = ref([]);

    const click_page = page => {
      if (page === -2) page = current_page - 1;
      if (page === -1) page = current_page + 1;
      let max_pages = Math.ceil(total_records / 10);

      if (page >= 1 && page <= max_pages) {
        pull_page(page);
      }
    }

    const update_pages = () => {
      let max_pages = Math.ceil(total_records / 10);
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
    const pull_page = page => {
      current_page = page;
      $.ajax({
        url: "http://127.0.0.1:8090/user/recordlist/getlist/",
        data: {
          page,
        },
        type: "get",
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          records.value = resp.records;
          total_records = resp.records_count;
          update_pages();
        }
      })
    }
    pull_page(current_page);
    return {
      records,
      pages,
      click_page,
    }
  }
}
</script>
  


<style>
.font-title {
  color: rgb(162, 219, 96);
  font-size: 25px;
}
</style>
<!-- 展示信息的样式 -->
<style>   .font-content {
     color: rgb(255, 255, 255);
     font-size: 30px;
     /*字体大小*/
     font-weight: 450;
     /*字体粗细*/
   }

   /* 超链接 样式设定 */
</style>

<style>
/* 回放详情 */
.aa {
  /*祛除连接下划线*/
  text-decoration: blink;
  background-color: rgb(71, 139, 211);
  margin: 0px;
  padding: 8px;
  font-size: 18px;
}

.aa:link {
  /*未点击之前为白色*/
  color: rgb(255, 255, 255);
}

.aa:visited {
  /*点击为白色*/
  color: rgb(237, 198, 81);
}

.aa:hover {
  /*鼠标置于链接上时 字体颜色为黑色，背景为白色*/
  background-color: rgb(204, 235, 81);
  /*标题 颜色设置*/
  color: black;
}
</style>