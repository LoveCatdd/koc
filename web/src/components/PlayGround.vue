<template>
    <div class="lightdark ">
        <div v-if="$store.state.pk.game_status === 'playing'" class="row margin-left">
            <div class="col-7 margin-top">
                <GameMap />
            </div>
            <div class="col-5 user margin-top padding- ">
                <PkInfo 
                    class="height-25 radius-u" 
                    :info="info_u"
                    @SaveClick="SaveClick" 
                />
                <div class="height-35" >
                    <ChatPost  />
                </div> 
                <ChatBase class="height-18" @post="post"/>
                <PkInfo 
                    class="height-25 radius-m" 
                    :info="info_me" 
                />
            </div>
        </div>
        <PkEnd v-else :info="info_me"   />
    </div>
</template>

<script>
import GameMap from '@/components/GameMap.vue';
import PkInfo from '@/components/PkInfo.vue';
import ChatBase from '@/components/ChatBase.vue';
import ChatPost from  '@/components/ChatPost.vue';
import PkEnd from './PkEnd.vue';
import { useStore } from 'vuex';
import { onUnmounted, ref } from 'vue';

export default {    
    name: 'PlayGround',
    components: {
        GameMap,
        PkInfo,
        ChatBase,
        ChatPost,
        PkEnd
    },
    setup() {   
        const store = useStore();
        const user_id = store.state.user.id;
        
        const info_me = {
            isMe: true,
            photo: store.state.user.photo,
            name: store.state.user.username,
            designation: store.state.user.designation,
            rating: store.state.user.rating,
        };

        const info_u = {
            isMe: false,
            photo: store.state.pk.opponent_photo,
            name: store.state.pk.opponent_username,
            designation: store.state.pk.opponent_designation,
            rating: store.state.pk.opponent_rating
        }

        let isSaveMsg =ref(true);

        const SaveClick = (status) => {
            console.log(status);
            console.log(isSaveMsg);
            isSaveMsg.value = status;
            console.log(isSaveMsg);
        }

        const socket = store.state.pk.socket;
        console.log(socket);
        socket.onmessage = msg => {
            const data = JSON.parse(msg.data);
            console.log(data);
            if (data.event === "action") {
                store.commit("updateAction", data.action);
            } else if (data.event === "wait") {
                store.commit("updateAction", data.action);
            } else if (isSaveMsg.value && data.event === "send-message") {
                store.commit("updatePost", {
                    id: data.id,
                    sender: data.sender,
                    content: data.content
                })
            } else if (data.event === "move") {
                const idx_list = data.step.split(" ");
                store.state.pk.game_obj.sync_idx(idx_list[0], idx_list[1]);
            } else if (data.event === "result") {
                store.commit("updateGameStatus"), {
                    game_status: data.game_status,
                }
                console.log(store.state.pk.game_status);
            }
        };
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

        onUnmounted(() => {
            if (socket !== null) {
                socket.close();
                store.commit('updateStatus', "matching");
                store.commit('updateMatchStatus', "matching");
                store.commit('updatePk');
            }
        });
        
        return {
            post,
            socket,
            isSaveMsg,
            info_me,
            info_u,
            SaveClick,
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