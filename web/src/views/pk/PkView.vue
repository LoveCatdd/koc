<template>
    <div class="lightdark ">
        <div class="row margin-left">
            <div class="col-7 margin-top">
                <GameMap />
            </div>
            <div class="col-5 user margin-top padding- ">
                <PkInfo class="height-25 radius-u"/>
                <div class="height-35" >
                    <ChatPost  :message="message" />
                </div> 
                <ChatBase class="height-18" @post="post"/>
                <PkInfo class="height-25 radius-m"/>
            </div>
        </div>
    </div>
</template>

<script>
import GameMap from '@/components/GameMap.vue';
import PkInfo from '@/components/PkInfo.vue';
import ChatBase from '@/components/ChatBase.vue';
import ChatPost from  '@/components/ChatPost.vue';

import { reactive } from 'vue';

export default {    
    name: 'PkView',
    components: {
        GameMap,
        PkInfo,
        ChatBase,
        ChatPost
    },
    setup() {   
        const message = reactive({
            count: 3,
            posts: [
                {
                    id: 1,
                    sender: 'me',
                    content: '你好',
                },
                {
                    id: 1,
                    sender: 'u',
                    content: '你好啊',
                },
                {
                    id: 1,
                    sender: 'me',
                    content: '蛤蛤',
                },
            ]
        });

        const post = (content) => {
            if (content === '') return ;
            message.count ++;
            message.posts.push({
                id: 1,
                sender: 'me',
                content: content
            });
        };

        return {
            message,
            post,
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