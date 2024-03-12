<template>
  <div class="center-" > 
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
                即将开始({{ countdown }})
            </div>
        </div>
  </div>
</template>

<script>
import MatchInfo from './MatchInfo.vue';
import { ref } from 'vue'
import { useStore } from 'vuex';
export default {
    name: 'MatchInfoBase',
    components: {
        MatchInfo,
    },
    setup() {
        let countdown = ref(3);
        const store = useStore();

        console.log(store.state.pk.a_direction + " " +store.state.pk.b_direction);

        const info_me = {   
            photo: store.state.user.photo,
            name: store.state.user.username,
            direction: parseInt(store.state.user.id) === parseInt(store.state.pk.a_id) ?
                store.state.pk.a_direction : store.state.pk.b_direction,
            designation: parseInt(store.state.user.id) === parseInt(store.state.pk.a_id) ?
                store.state.pk.a_designation : store.state.pk.b_designation,
        };

        const info_u = {
            photo: store.state.pk.opponent_photo,
            name: store.state.pk.opponent_username,
            direction: parseInt(store.state.user.id) === parseInt(store.state.pk.a_id) ?
                store.state.pk.b_direction : store.state.pk.a_direction,
            designation: parseInt(store.state.user.id) === parseInt(store.state.pk.a_id) ?
                store.state.pk.b_designation : store.state.pk.a_designation,
        };

        setInterval(() => {
            countdown.value --;
        }, 1000);

        return {
            info_u,
            info_me,
            countdown
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

</style>