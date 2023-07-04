<template>
    <div ref="parent" class="replaymap">
        <canvas ref="canvas" class="radius-"></canvas>
    </div>
</template>

<script>
import {ReplayMap} from '@/assets/script/replaymap/ReplayMap';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'ReplayMap',
    setup() {
        const store = useStore();
        onMounted(() => {
            store.commit("updateReplayGameOBJ",
                new ReplayMap(canvas, parent.value,store)
            );
        })
        return {
            parent,
            canvas,
        }
    }
}
</script>

<style scoped>
.replaymap {
    height: 800px;
    width: 800px;

}
.radius- {
    border-radius: 1%;
}
</style>