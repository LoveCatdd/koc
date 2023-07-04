<template>
    <div>
        <button @click="leftClick">
            左
        </button>
        <button>
            -- 
        </button>
        <button @click="rightClick">
            右
        </button>
    </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
    name: 'ReplayControl',
    setup() {
        const store = useStore();

        const leftClick = () => {
            
        };
        const rightClick = () => {

        };
        return {
            leftClick,
            rightClick
        }
    }
}
</script>

<style>

</style>