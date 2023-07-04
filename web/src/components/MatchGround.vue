<template>
<div class="lightdark ">
    <div v-if="$store.state.pk.match_status === 'matching' " class="center-"> 
        <div class="card-background radius">
            <div class="center- margin-bottom position-">
                <img class="img-size"  :src="$store.state.user.photo" alt="">
                <div class="sr-size" >
                    <span :class="match_bool ? 'loader' : '' "></span>
                </div>
            </div>
            <span class="username-rating left-" >
               {{ $store.state.user.username }}
            </span>
            <span class="username-rating right-">
                {{$store.state.user.rating}}
            </span>
            <div class="center- margin-top">
                <button @click="click_btn" type="button" class="btn btn-warning  button-size">
                    {{ match_btn }}
                </button>
            </div>
            <div class="time-size" v-if="match_bool">
                {{ minute }}：{{ seconds }}
            </div>
        </div>
    </div>

    <MatchInfoBase 
        v-else-if="$store.state.pk.match_status === 'success' && 
                $store.state.pk.status === 'matching' "  
        />

</div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import MatchInfoBase from './MatchInfoBase.vue';
export default {
    name: 'MatchGround',
    components: {
        MatchInfoBase
    },
    setup() {
        let match_btn = ref("开始匹配");
        let match_bool = ref(false);
        let minute = ref(0);
        let seconds = ref(0);

        const store = useStore(); 
        const click_btn = () => {
            if (match_btn.value === "开始匹配") {
                match_btn.value = "取消";
                match_bool.value = true;
                store.state.pk.socket.send(JSON.stringify({
                    event: "start-matching"
                }))

                minute.value = 0;
                seconds.value = 0;
            } else if (match_btn.value === "取消") {
                match_btn.value = "开始匹配";
                match_bool.value = false;
                store.state.pk.socket.send(JSON.stringify({
                    event: "stop-matching"
                }))

            }
        };

        setInterval(() => {
            if (seconds.value < 60) {
                seconds.value = seconds.value + 1;
            } 
            if (seconds.value == 60) {
                minute.value = minute.value + 1;
                seconds.value = 0;
            }
        },1000);


        return {
            match_btn,
            click_btn,
            minute,
            seconds,
            match_bool,
        }
    }
}
</script>


<style scoped>
.loader {   
  width: 140px;
  height: 140px;
}

.loader:before , .loader:after{
  content: '';
  border-radius: 50%;
  position: absolute;
  inset: 0;
  box-shadow: 0 0 15px 3Px rgba(236, 192, 82, 0.805) inset;
}
.loader:after {
  box-shadow: 0 4px 0 #ffd453 inset;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  0% {  transform: rotate(0)}
  100% { transform: rotate(360deg)}
}

.sr-size {
    height: 140px;
    width: 140px;
    border-width: 1vh;
}

.position- {
    position: relative;
}
.radius {
    border-radius: 10px;
}
.lightdark {
    height: 904px;
    width: 100%;
    background-color: #312E2B;
}
.center- {
    display: flex;
    justify-content: center;
    align-content: center;

}
.card-background {
    padding: 40px;
    margin-top: 100px;
    background-color:#272522;

    height: auto;
    width: calc(height) * 3 / 4;
    position: relative
}
.img-size {
    height: auto;
    width: auto;
    border-radius: 10px;
    position: absolute;
}
.radius {
    border-radius: 10px;
}
.margin-bottom {
    margin: 20px 25px 85px 20px
}
.username-rating {
    font-size: 30px;
    font-weight: bolder;
    color: rgb(255, 255, 255);
    height: auto;
    width: auto;
}
.left- {
    margin-right: 20px;
}
.right- {
    margin-left: 50px;
}
.time-size {
    font-size: 20px;
    color: azure;
    margin-top: 15px;
    position: absolute;
    bottom: 2px;
    left: 2px;
}
.button-size {
    font-size: 20px;
    height: 55px;
    width: 120px;
}
.margin-top {
    margin-top: 40px;
}
</style>