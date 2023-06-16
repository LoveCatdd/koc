<template>
    <div class="lightdark">
        <div class="row margin-left">
            <div class="col-7 margin-top">
                <GameMap />
            </div>
            <div class="col-5 user margin-top">
            </div>
        </div>
        <ContentBase>
            <div class="row ">
                <div class="col content">投降</div>
                <div class="col content">升级</div>
                <div class="col content">时间</div>
            </div>
        </ContentBase>
    </div>
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
    margin: 0px 0px 10px 200px;
    padding: 0px;
}
.margin-top {
    margin-top: 20px;
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
.lightdark {
    height: 100%;
    width: 100%;
    background-color: #312E2B;
}
</style>