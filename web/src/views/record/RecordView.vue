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
                    <p>玩家A</p>
                    <hr />
                  </th>
                  <th>
                    <p >玩家B</p>
                    <hr />
                  </th>
                  <th>
                    <p>对战结果</p>
                    <hr />
                  </th>
                  <th>
                    <p>对战时间</p>
                    <hr />
                  </th>
                </tr>
              </thead>
      <tbody>
        <tr v-for="record in records" :key="record.record.id">
          <td class="tr-size">
            <img :src="record.a_photo" alt="" class="img-size" >
            &nbsp;
            <span class="text-center">{{ record.a_username }}</span>
          </td>
          <td class="tr-size">
            <img :src="record.b_photo" alt="" class="img-size" >
            &nbsp;
            <span class=" text-center">{{ record.b_username }}</span>
          </td>
          <td class="tr-size text-center">
            {{ record.result }}
            <span v-if="record.result !== '平局'" class="font-size">win</span>
          </td>
          <td class="tr-size text-center">
            {{ record.record.createtime }}
          </td>
        </tr>
      </tbody>

    </table>
  </div>
      <nav aria-label="..." class="page-size">
        <ul class="pagination">
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
// import ContentBase from '@/components/ContentBase.vue';
import { useStore } from "vuex";
import { ref } from 'vue';
import $ from 'jquery';
export default {
  name: 'RecordView',
  components: {
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
  


<style scoped>
.font-size {
  font-size: 24px;
  font-family: monospace;
  color: rgb(129, 186, 16);
}
.page-size {
  margin-top: 25px;
  float: right;
}
i {
  color: azure;
  font-size: 35px;
  margin: 10px 10px 10px 10px;
}

.page-size {
  margin-top: 25px;
  display: flex;
  justify-content: right;
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

    height: 90%;
    width: auto;
}
.f1 {
  color: rgb(255, 255, 255);
  font-size: 25px;
  font-weight: 200;
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
  height: 100px;
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