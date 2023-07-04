<template> 
<div>
    <div class="row">
        <div class="col-3 padding-" @click="showClick">
            <img :src="info.photo" alt="无法显示" class="size- radius-">
        </div>
        <div class="col-9 padding-">
            <div class="container-">
                <div class="username- left-right font-family-">
                    {{ info.name }}
                </div>
                <div class="time-size font-family"> 
                    时间：{{ formatTime(countdown) }}
                </div>
            </div>
            <div class="title- left-right font-family">
                {{ info.designation }}
            </div>
        </div>
    </div>
      <i    type="button" 
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" 
            aria-controls="offcanvasRight"
            class="bi bi-person-circle icon-size icon-color"
            v-if="showIconstatus"
        ></i>
            <UserInfoBase :info="info"/>
        <i 
            @click="noSaveMsg" 
            v-if="showIconstatus && !info.isMe && showChatstatus" 
            class="bi bi-chat-text icon-size icon-color"
        ></i>
        
        <i
            @click="SaveMsg" 
            v-else-if="showIconstatus && !info.isMe && !showChatstatus"
            class="bi bi-slash-lg icon-size icon-color"
        ></i> 
</div>
</template>

<script>
import { onBeforeUnmount, ref, watch } from 'vue';
import UserInfoBase from './UserInfoBase.vue';
import { useStore } from 'vuex';
export default {
    name: 'PkInfo',
    components: {
        UserInfoBase,
    },
    props: {
        info: {
            type: String,
            required: true,
        }
    },
    setup(props, context) {
        let showIconstatus = ref(false);
        let showChatstatus = ref(true);
        const showClick = () => {   
            showIconstatus.value = !showIconstatus.value;
        };

        const noSaveMsg = () => {
            context.emit('SaveClick',false);
            showChatstatus.value = !showChatstatus.value;
        };
        
        const SaveMsg = () => {
            context.emit('SaveClick',true);
            showChatstatus.value = !showChatstatus.value;
        }
        let countdown = ref(10);

        const store = useStore();
        let timer = 0;

        const startCountdown = () => {
            timer = setInterval(() => {
                if (countdown.value > 0) {
                    countdown.value--;
                    } else {
                    clearInterval(timer);
                    console.log("countdown: " + countdown.value);
                    store.state.pk.socket.send(JSON.stringify({
                        event: "finished",
                        status: "finished",
                    }));
                
                }
            }, 1000);
        };

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60).toString().padStart(2, '0');
            const seconds = (time % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        };

        if (store.state.pk.action === 'action' && props.info.isMe) {
            startCountdown();   
        } else if (store.state.pk.action === 'wait' && props.info.isMe) {
            clearInterval(timer);
        } else if (store.state.pk.action === 'wait' && !props.info.isMe) {
            startCountdown();
        } else if (store.state.pk.action === 'action' && !props.info.isMe) {
            clearInterval(timer);
        }

        watch(() => store.state.pk.action, (newValue) => {
            if (newValue === 'action' && props.info.isMe) {
                startCountdown();
            } else if (newValue === 'wait' && props.info.isMe) {
                clearInterval(timer);
            } else if (newValue === 'wait' && !props.info.isMe) {
                startCountdown();
            } else if (newValue === 'action' && !props.info.isMe) {
                clearInterval(timer);
            }
        });

        onBeforeUnmount(() => {
            clearInterval(timer); // 在组件卸载前清除计时器
        });

        return {
            showClick,
            showIconstatus,
            showChatstatus,
            noSaveMsg,
            SaveMsg,        
            countdown,  
            formatTime
        }
    }
}
</script>

<style scoped>


.font-family- {

    font-weight: bolder;
    font-family: monospace;
}
.padding- {
    padding: 0px;
}
.col-3 {
    height: 115px;
    width: 115px;
    margin-left: 10px;
}
.radius- {
    border-radius: 15%;
    margin: 10px 0px 0px 15px;
}
.size- {
    width: 100px;
    height: 100px;
}
.username- {
    font-size: 24px;
    color: rgb(255, 255, 255);
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 5px;
}
.title- {
    font-size: 24px;
    color:lightslategrey;
    margin-top: 10px;
    margin-left: 20px;
    display: flex;
    /* justify-content: center; */
    align-content: center;
}
.icon-size {
    font-size: 35px;
    margin-top: 0px;
    margin-left: 10px;
    margin-right: 5px;
}

.time-size {
    font-size: 26px;
    color: azure;
    margin: 15px 10px 7px 0px;
}

.left-right {
    flex: 1;
}

.icon-color {
    color: azure;
}
.container- {
    display: flex;
}
</style>