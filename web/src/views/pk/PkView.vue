<template>
    <PlayGround v-if="$store.state.pk.status === 'playing' " />
    <MatchGround v-else-if="$store.state.pk.status === 'matching' " />
</template>

<script>

import { onMounted, onUnmounted} from 'vue';
import { useStore } from 'vuex';
import PlayGround from '@/components/PlayGround.vue';
import MatchGround from '@/components/MatchGround.vue';


export default {    
    name: 'PkView',
    components: {
        PlayGround,
        MatchGround
    },
    setup() {   
        const store = useStore();
        
        const socketUrl = `ws://127.0.0.1:8090/websocket/${store.state.user.token}`;

        let socket = null;

        onMounted(() => {
            socket = new WebSocket(socketUrl);

            socket.onopen = () => {
                console.log("connected");
                store.commit('updateSocket', socket);
            }
            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                if (data.event === "start-matching") {
                    store.commit('updateOpponent', {
                        username: data.username,
                        photo: data.photo
                    });
                    store.commit("updateGame", data.game);
                    setTimeout(() => {
                        store.commit('updateMatchStatus', "success");
                    }, 1000);
                    setTimeout(() => {
                        store.commit('updateStatus', "playing");
                    }, 3000);
                } 
            }
        });

        onUnmounted(() => {
            if (socket !== null) {
                socket.close();
                store.commit('updateStatus', "matching");
            }
        });

        return {
        }
    }
}
</script>

<style scoped>

</style>