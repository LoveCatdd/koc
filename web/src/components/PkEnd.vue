<template>
    <div class="center-"> 
        <div class="card-background radius">
            <div class="margin-bottom margin-">  
                <img class="img-size img-float" :src="$store.state.user.photo" alt="">        
                <div class="user-margin">
                    <div class="game-float user-color">
                        {{ $store.state.pk.play_status === "rank" ?"排位场":"匹配场"}}</div>
                    <div  class="user-margin user-color">{{ $store.state.user.username }}</div>
                    <div class="user-margin user-color">{{ $store.state.user.designation }}</div>
                </div>
            </div>
            <div v-if="$store.state.pk.play_status === 'rank' " class="body-margin">
                <div class="user-color">
                    rating: {{ rating }}(
                        <span v-if="loser === 'win'">{{ add }}</span>
                    <span class="lose" v-else-if="loser === 'lose'">{{ reduce }}</span>)
                </div>
            </div>
            <div v-else class="body-margin">
                <div class="user-color">
                    <span></span>
                </div>
            </div>
            <button class="button-float btn" @click="rightClick">
                确认
            </button>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import { onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'PkEnd',
    props: {
        info: {
            type: Object,
            required: true,
        }
    },
    setup() {

        const store = useStore();

        let rating = parseInt(store.state.user.rating);

        const loser = store.state.pk.loser;
        const playing_status = store.state.pk.play_status;
        const add = "+50";
        const reduce = "-20";
        console.log(loser);
        if (playing_status ==="rank" && loser === "win") {
            rating += 50;
        } else if (playing_status ==="rank" && loser === "lose") {
            rating -= 20;
        }

        const rightClick = () => {
            store.commit("updateGameStatus",  "playing",);
            store.commit("updatePlayStatus", {
                play_status: '',
            });
            store.commit("updateLoser", {
                loser: 0,
            });
            store.commit('updateStatus', "matching");
            store.commit('updateMatchStatus', "matching");
            store.commit('updatePk');
            router.push({name: 'home'});
        };


        onUnmounted(() => {
            store.commit("updateGameStatus",  "playing",);
            store.commit("updatePlayStatus", {
                play_status: '',
            });
            store.commit("updateLoser", {
                loser: 0,
            });
            store.commit('updateStatus', "matching");
            store.commit('updateMatchStatus', "matching");
            store.commit('updatePk');
        });
        return {
            rightClick,
            rating,
            add,
            reduce,
            loser
        }
    }
}
</script>


<style scoped>

.game-float {
    float: right;
}

.button-float {
    float: right;
}

.btn {
 display: inline-block;
 padding: 0.9rem 1.8rem;
 font-size: 24px;
 font-weight: 700;
 color: white;
 border: 3px solid rgb(252, 70, 100);
 cursor: pointer;
 position: relative;
 background-color: transparent;
 text-decoration: none;
 overflow: hidden;
 z-index: 1;
 font-family: inherit;
 height: 80px;
 width: 150px;
 margin-top: 70px;
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
span {
    color:lightgreen;
}
.lose {
    color:lightcoral;
}
.body-margin {
    margin-top: 95px;
    background-color: #30302e;
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

.user-color {
    color: rgb(255, 255, 255);
    font-size: 24px;
    font-weight: bolder;
    font-family: monospace;
}
.user-margin {
    margin: 15px 15px 10px 80px;
}
</style>