<template>
    <div class="row margin-left">
        <div class="col-7">
            <GameMap />
        </div>
        <div class="col-5 user">
            
        </div>
    </div>
    <ContentBase>
        <div class="row ">
            <div class="col content">投降</div>
            <div class="col content">升级</div>
            <div class="col content">时间</div>
        </div>
    </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase.vue';
import GameMap from '@/components/GameMap.vue';
export default {    
    name: 'PkView',
    components: {
        ContentBase,
        GameMap,
    },
}
</script>

<style scoped>
.margin-left {
    margin: 20px 0px 10px 200px;
    padding: 0px;
}

.user{
    margin-left: 30px;
    height: 600px;
    width: 450px;
    background-color: aquamarine;
}
.col-7 {
    width: 610px;
    height: 610px;
}
.content {
    display: flex;
    justify-content: center;
    align-content: center;
}
</style>