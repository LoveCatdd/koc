<template>
    <div class="lightdark ">
        <div class="row margin-left">
            <div class="col-7 margin-top">
                <GameMap />
            </div>
            <div class="col-5 user margin-top padding- ">
                <PkInfo class="height-25 radius-u" :username="$store.state.pk.opponent_username"/>
                <div class="height-35" >
                    <ChatPost  />
                </div> 
                <ChatBase class="height-18" @post="post"/>
                <PkInfo class="height-25 radius-m" :username="$store.state.user.username"/>
            </div>
        </div>
    </div>
</template>

<script>
import GameMap from '@/components/GameMap.vue';
import PkInfo from '@/components/PkInfo.vue';
import ChatBase from '@/components/ChatBase.vue';
import ChatPost from  '@/components/ChatPost.vue';

import { useStore } from 'vuex';
import { onMounted, onUnmounted } from 'vue';

export default {    
    name: 'PlayGround',
    components: {
        GameMap,
        PkInfo,
        ChatBase,
        ChatPost
    },
    setup() {   
        const store = useStore();
        const user_id = store.state.user.id;
        let socket = null;
        const post = (content) => {
            if (content === '') return ;
            const post = {
                id: user_id,
                sender: 'me',
                content: content
            };
            store.commit("updatePost", post);
            socket.send(JSON.stringify({
                event: "send-message",
                id: user_id,
                content: content
            }));
        };

        onMounted(() => {
         
            socket = store.state.pk.socket;
            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                if (data.event === "action") {
                    console.log(data);
                } else if (data.event === "send-message") {
                    store.commit("updatePost", {
                        id: data.id,
                        sender: data.sender,
                        content: data.content
                    })
                }
            }
        });

        onUnmounted(() => {
            if (socket !== null) {
                // socket.onclose();
                store.commit('updateStatus', "matching");
            }
        });

        return {
            post,
            socket,
        }
    }
}
</script>

<style scoped>
.margin-left {
    margin: 0px 0px 0px 200px;
    padding: 0px;
}
.margin-top {
    margin-top: 25px;
}
.user{
    margin-left: 30px;
    height: 800px;
    width: 540px;
    position: relative;
}
.col-7 {
    width: 800px;
    height: 884px;
}

.lightdark {
    background-color: #312E2B;
}
.height-35 {
    height: 42%;
    width: 100%;
    background-color: #444654;
}
.height-18 {
    height: 18%;
    width: 100%;
    background-color: #444654;
}
.height-25 {
    height: 20%;
    width: 100%;
    background-color: #272522;
}
.padding- {
    padding: 0px;
}
.radius-u {
    border-radius: 2.5% 2.5% 0% 0%;
}
.radius-m {
    border-radius: 0% 0% 2.5% 2.5%;
}

</style>