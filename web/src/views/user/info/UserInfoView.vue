<template>
<div class="lightdark ">
  <div class="center- "> 
    <div class="card-background radius">
      <div class=" margin-bottom ">  
          <img class=" img-size img-float" :src="$store.state.user.photo" alt="">        
          <div class="user-margin">
              <div class="rating-float user-color">{{ $store.state.user.rating }}</div>
              
              <div class="dropdown">
                <div 
                  type="button" 
                  data-bs-toggle="dropdown"
                  data-placement="right" 
                  title="更改用户名" 
                  class="user-margin user-color"
                  aria-expanded="false" 
                  data-bs-auto-close="outside"  
                >
                  {{ $store.state.user.username }}
                </div >

                <form  @submit.prevent="updateUsername" class="dropdown-menu p-4 backgorund-">
                  <div class="mb-3">
                    <label for="username" class="form-label user-color">更改用户名</label>
                    <input v-model="username" type="text" class="form-control" id="username" aria-describedby="validationusername" placeholder="新用户名">
                  </div>
                  <button  type="submit" class="btn button-float">确认</button>
                </form>
              </div>

              <div type="button" data-toggle="tooltip" data-placement="right" title="查看称号" class="user-margin user-color">666</div>
          </div>
      </div>
      <PkUserInfoBase />
    </div>  
  </div>

</div> 
</template>
  
<script>
import PkUserInfoBase from '@/components/PkUserInfoBase.vue';
import $ from 'jquery';
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'UserInfoView',
    components: {
      PkUserInfoBase
    },
    setup() {
      const store =useStore();
      let username = ref('');
      let photo = ref('');
      const updateUsername = () => {
        console.log("update username");
          $.ajax({
            url: 'http://127.0.0.1:8090/user/account/info/update/',
            type: 'post',
            headers: {
                Authorization: "Bearer " + store.state.user.token,
            },
            data: {
              event: 'send-username',
              username: username.value,
            },
            success(resp) {
              console.log(resp.error_message);
              if (resp.error_message === 'success') {
                    store.commit("updateUsername", username.value);
                }
              }
          });
      };
      const updatePhoto = () => {
          $.ajax({
            url: 'http://127.0.0.1:8090/user/account/info/update/',
            type: 'post',
            headers: {
                Authorization: "Bearer " + store.state.user.token,
            },
            data: {
              event: 'send-photo',
              photo: photo,
            },
            success(resp) {
              if (resp.error_message === 'success') {
                store.commit("updatePhoto", photo);
              }
            },
            error(resp) {
              console.log(resp);
            }
          });
      };
      return {
        updateUsername,
        username,
        photo,
        updatePhoto,
      }
    }

}
</script>


<style scoped>

.form-control {
    background-color: #3C3A38;
    color: #ffffff;
}

.backgorund- {

  background-color: #30302e;
}
.button-float {
    float: right;
}
input::placeholder {
    color: #9C9B9A;
}
.btn {
 display: inline-block;
 padding: 0.4rem 1rem;
 font-size: 13px;
 font-weight: 200;
 color: rgb(255, 255, 255);
 border: 3px solid rgb(252, 70, 100);
 cursor: pointer;
 position: relative;
 background-color: transparent;
 text-decoration: none;
 overflow: hidden;
 z-index: 1;
 font-family: inherit;
 height: 40px;
 width: 90px;
 margin-top: 7px;
}

.btn::before {
 content: "";
 position: absolute;
 left: 0;
 top: 0;
 width: 100%;
 height: 100%;
 background-color: rgb(252, 70, 100);
 transform: translateX(-100%);
 transition: all .3s;
 z-index: -1;
}

.btn:hover::before {
 transform: translateX(0);
}


  
.lightdark {
    height: 904px;
    width: 100%;
    background-color: #312E2B;
}


.img-float {
    float: left;
}
.radius {
    border-radius: 10px;
}
.center- {
    height: 904px;
    width: 100%;

    display: flex;
    justify-content: center;
    align-content: center;

}
.card-background {
    padding: 40px;
    margin-top: 100px;
    background-color:#272522;

    height: 550px;
    width: 850px;
}
.img-size {
    height: 140px;
    width: 140px;
    border-radius: 50%;
}
.radius {
    border-radius: 10px;
}
.margin-bottom {
    margin: 0px 25px 45px 20px
}

.text- {
  margin-bottom: 7px;
  
  text-align: center;
}

.user-color {
    color: rgb(255, 255, 255);
    font-size: 24px;
    font-weight: bolder;
    font-family: monospace;
}
.user-margin {
    margin: 15px 15px 10px 80px;
}
.rating-float {
  float: right;
}

</style>