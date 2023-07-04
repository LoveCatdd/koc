<template>
    <div class="lightdark ">
        <div class="row margin-left">
            <div class="col-7 margin-top">
                <ReplayMap />
            </div>
            <div class="col-5 user margin-top padding- ">
                <PkInfo 
                    class="height-25 radius-u" 
                    :info="info_u"
                />
                <div class="height-35" >
                    <ReplayControl  />
                </div> 
                <PkInfo 
                    class="height-25 radius-m" 
                    :info="info_me" 
                />
            </div>
        </div>
    </div>
</template>

<script>
import ReplayMap from '@/components/ReplayMap.vue';
import PkInfo from '@/components/PkInfo.vue';
import ReplayControl from './ReplayControl.vue';

export default {    
    name: 'PlayGround',
    components: {
        ReplayMap,
        PkInfo,
        ReplayControl,
    },
    setup() {

        return {

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