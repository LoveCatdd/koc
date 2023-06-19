<template>
    <div class="chat-bot" id="msg" ref="chatMessages" >
        <div v-for="post in message.posts" :key="post.id">
            <div  :class=" post.sender === 'me'? 'chat-m': 'chat-u'"> 
                <div :class=" post.sender === 'me'? 'chat-msg-m' : 'chat-msg-u' ">
                    {{ post.content }}
                </div>
        </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    name: 'ChatPost',
    props: {
        message: {
            type: Object,
            required: true,
        }
    },
    setup() {
        let chatMessages = ref(null);

        const scrollToBottom = () => {
            chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
        };
        setInterval(() =>{
            if (chatMessages.value)
                scrollToBottom();
        }, 900);

        onMounted(() => {
            chatMessages.value = document.getElementById('msg');
        });

        return {
            scrollToBottom,
            chatMessages,
        }
    }
}
</script>

<style scoped>
.chat-bot {
  flex-grow: 1;
  overflow: auto;
  max-height: 360px; /* 当内容超出最大高度时显示滚动条 */
}
.chat-msg-u {
  padding: 10px;
  margin: 10px 10px 15px 15px;
  height: auto;
  max-width: 70%;
  border-radius: 1%;
  background-color: #ffffff;  /* #1f7f36*/
  white-space: pre-wrap; /* 设置换行方式以保留换行符 */
}

.chat-msg-m {
  padding: 10px;
  margin: 10px 10px 15px 15px;
  height: auto;
  max-width: 70%;
  border-radius: 1%;
  background-color: #3ab929;  /* #1f7f36*/
  white-space: pre-wrap; /* 设置换行方式以保留换行符 */
}
.chat-m {
  display: flex;
  justify-content:flex-end;
}
.chat-u {
  display: flex;
  justify-content:flex-start;
}
</style>