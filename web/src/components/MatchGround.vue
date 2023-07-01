<template>
<div class="lightdark ">
    <div class="center-"> 
        <div class="card-background radius">
            <div class="center- margin-bottom">
                <img class="img-size"  src="https://cdn.acwing.com/media/user/profile/photo/221303_lg_6d0dad88de.png" alt="">
            </div>
            <span class="username-rating left-" >
               {{ $store.state.user.username }}
            </span>
            <span class="username-rating right-">
                1500
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
</div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'MatchGround',
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
            match_bool
        }
    }
}
</script>


<style scoped> 
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
    
    margin-top: 35px;
    background-color:#272522;
    padding: 40px;
    height: auto;
    width: calc(height) * 3 / 4;
    position: relative
}
.img-size {
    height: 200px;
    widows: 200px;
    border-radius: 50%;
}
.radius {
    border-radius: 10px;
}
.margin-bottom {
    margin-bottom: 45px;
}
.username-rating {
    font-size: 30px;
    font-weight: bolder;
    color: blueviolet;
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