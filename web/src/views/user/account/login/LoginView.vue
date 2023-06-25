<template>
    <div class="background-">
        <div class="center-">
            <img class="img-size margin-" src="../../../../../public/images/logo2.png" alt="">
        </div>
        <div class="center- ">
            <div class="card-background radius">
                <form @submit.prevent="login">
                    <div class="input-group mb-3">
                    <i class="bi bi-person-fill icon-color icon-size"></i>
                    <input 
                        type="text" 
                        :class=" error_message === 'success' || 
                            error_message === '' ? 'form-control' : 'form-control is-invalid'"
                        placeholder="用户名" 
                        aria-describedby="validationusername"
                        v-model="username"
                    >
                    </div>
                    <div class="input-group mb-3">
                        <i class="bi bi-person-fill-lock icon-color icon-size"></i>
                        <input 
                            type="password" 
                            :class=" error_message === 'success' || 
                                error_message === '' ? 'form-control' : 'form-control is-invalid'" 
                            placeholder="密码" 
                            aria-describedby="validationpassword"
                            v-model="password"
                        >
                        <div id="validationpassword" class="invalid-feedback">
                            {{ error_message }}
                        </div>
                    </div>
                    <div class="forgot">
                        <router-link class="nav-link" :to="{name: 'login'}">忘记密码?</router-link>
                    </div>
                    <button type="submit" class="login">登录</button>
                </form> 
                <hr />
                <div class="register">
                    <span class="register-title">新用户? </span>
                    <router-link class="nav-link" :to="{name: 'register'}"> 注册账号</router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';

export default {
    name: 'LoginView',
    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let error_message = ref('');
        
        const login = () => {
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                    error_message.value = '';
                    store.dispatch("getInfo", {
                        success() {
                            router.push({name: 'home'});
                        }
                    })
                },
                error() {
                    error_message.value = "用户名或密码错误";
                }
            })
        };

        return {
            username,
            password,
            error_message,  
            store,
            login,
        }
    }
}
</script>

<style scoped>

.background- {
    height: 961px;
    width: 100%;
    background-color: #312E2B;
    background-repeat: no-repeat;
    background-position: bottom center;
    background-size: cover; /* 可选，根据视口大小自动调整背景图片大小 */
    background-image: url('../../../../../public/images/background.png');

}
.center- {
    display: flex;
    justify-content: center;
    align-content: center;
}

.card-background {
    background-color:#262421;
    padding: 40px;
    height: auto;
    width: 20%;
}

.title- {
    display: flex;
    justify-content: center;
    color: azure;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 36px;
    margin-bottom: 20px;
    font-weight: bolder;
}

.margin- {
    margin-top: 50px;
}
.img-size {
    height: 200px;
    width: 200px;
}

.form-control {
    background-color: #3C3A38;
    color: #ffffff;
}
.icon-color {
    color: azure;
}

.icon-size {
    font-size: 25px;
    margin-right: 5px;
}

.radius {
    border-radius: 10px;
}

input::placeholder  {
    color: #9C9B9A;
}

.forgot {
    color:rgb(57, 195, 254);
    display: flex;
    justify-content: flex-end;
    width: fix-content;
    margin-bottom: 10px;
}

.login {
  width: 100%;
  background: linear-gradient(to bottom, #7FA650 0%,#7FA650 100%); 
  border: none;
  border-radius: 10px;
  position: relative;
  border-bottom: 5px solid #668540;
  color: #fbfbfb;
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;
  text-shadow: 1px 1px 1px rgba(0,0,0,.4);
  font-size: 30px;
  text-align: center;
  box-shadow: 0px 3px 0px rgba(0,0,0,.2);
  cursor: pointer;

  margin: 15px 0px 10px 0px;
}
.login:active {
  box-shadow: 0px 2px 0px rgba(0,0,0,.2);
  top: 1px;
}

.register {
    margin: 10px 0px 0px 10px;
    padding: 10px;
    font-size: 15px;
    color: rgb(57, 195, 254);
   /* background-color: #211F1C; */

    display: flex;
    justify-content: flex-end;
}
.register-title {
    margin-right: 5px;
    color: #d7d7d7;
    display: flex;
}

hr {
    color: #9C9B9A;
}
</style>