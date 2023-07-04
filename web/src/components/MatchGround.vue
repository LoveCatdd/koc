<template>
<div class="lightdark ">
    <div v-if="$store.state.pk.match_status === 'matching' " class="center-"> 
        <div class="card-background radius">
            <div class="center- margin-bottom">
                <img class="img-size"  :src="$store.state.user.photo" alt="">
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

    <div 
        v-else-if="$store.state.pk.match_status === 'success' && 
                $store.state.pk.status === 'matching' "  
        class="center-"
        @change="updateInfo"        
    > 
        <div class="shadowed  border- card-background- radius">
            <div class="title-font">
                对局已就绪
            </div>
            <hr />
            <div class="row">
                <div class="col-5">
                    <MatchInfo :info="info_me"/>
                </div>
                <div class="col-2 pk ">vs</div>
                <div class="col-5">  
                    <MatchInfo :info="info_u"/>
                </div>
            </div>
            <div class="countdown">
                即将开始(3)
            </div>
        </div>
    </div>

</div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import MatchInfo from './MatchInfo.vue';
export default {
    name: 'MatchGround',
    components: {
        MatchInfo,
    },
    setup() {
        let match_btn = ref("开始匹配");
        let match_bool = ref(false);
        let minute = ref(0);
        let seconds = ref(0);
        
        const store = useStore(); 

        let info_me = {
            photo: store.state.user.photo,
            name: store.state.user.username,
            direction: 
                store.state.user.id === store.state.pk.a_id ? 
                store.state.pk.a_direction : store.state.pk.b_direction,
        };

        let info_u = {
            photo: store.state.pk.opponent_photo,
            name: store.state.pk.opponent_username,
            direction: 
                store.state.user.id === store.state.pk.a_id ? 
                store.state.pk.b_direction : store.state.pk.a_direction,
        };

        const updateInfo = () => {
          info_u = {
                photo: store.state.pk.opponent_photo,
                name: store.state.pk.opponent_username,
                direction: 
                    store.state.user.id === store.state.pk.a_id ? 
                    store.state.pk.b_direction : store.state.pk.a_direction,
            };
        };

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
            info_me,
            info_u,
            updateInfo
        }
    }
}
</script>


<style scoped>
.countdown {
    color: #8FCD9F;
    font-size: 15px;
    font-family: monospace;
    text-align: center;
    margin-top: 10px;
}
.pk {
    color: #f2bb06;
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 60px;
    font-family: monospace;
}

.title-font {
    color: aliceblue;
    font-weight: bolder;
    font-size: 24px;
    font-family:cursive ;
    text-align: center;
}

hr {
    color: #242848;
    margin: 0px 0px 10px 0px;
    border-width: 6px;
}

.shadowed {
    box-shadow: 0px 0px 6px 4px rgba(180, 239, 199, 0.5);
}

.border- {
    border-width: 2px;
    border-style: solid;
    border-color: #BE8358;
}

.card-background- {
    padding: 10px;
    margin-top: 120px;
    background-color:#1A1F39;
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
}
.radius {
    border-radius: 10px;
}
.margin-bottom {
    margin: 20px 25px 45px 20px
}
.username-rating {
    font-size: 30px;
    font-weight: bolder;
    color: blueviolet;
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