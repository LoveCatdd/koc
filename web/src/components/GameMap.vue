<template>
    <div ref="parent" class="gamemap">
        <canvas ref="canvas" class="radius-"></canvas>
    </div>
</template>

<script>
import {GameMap} from '@/assets/script/gamemap/GameMap';
import { ref, onMounted } from 'vue';

export default {
    name: 'GameMap',
    setup() {
        let parent = ref(null);
        let canvas = ref(null);
        let direction = 1;
        
        onMounted(() => {
            new GameMap(canvas, parent.value,direction)
        })
        return {
            parent,
            canvas
        }
    }
}
</script>

<style scoped>
.gamemap {
    height: 610px;
    width: 610px;

}
.radius- {
    border-radius: 1%;
    /* background-color: rgb(224, 224, 216); */
}
</style>