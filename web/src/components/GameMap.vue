<template>
    <div ref="parent" class="gamemap">
        <canvas ref="canvas" class="radius-"></canvas>
    </div>
</template>

<script>
import {GameMap} from '@/assets/script/gamemap/GameMap';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'GameMap',
    setup() {
        let parent = ref(null);
        let canvas = ref(null);
        const store = useStore();

        onMounted(() => {
            store.commit("updateGameOBJ",
                            new GameMap(canvas, parent.value,store)
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
.gamemap {
    height: 800px;
    width: 800px;

}
.radius- {
    border-radius: 1%;
}
</style>