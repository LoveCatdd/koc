<template>
<div class="lightdark offcanvas offcanvas-end offcanvas-size" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-body margin- body-color">
        <img class="img-size img-float" :src="info.photo" alt="">        
        <div class="user-margin">
            <div class="rating-float user-color">rating</div>
            <div  class="user-margin user-color">lpxl</div>
            <div class="user-margin user-color">666</div>
        </div>
        <PkUserInfoBase />
    </div>
</div>
</template>

<script>

import PkUserInfoBase from './PkUserInfoBase.vue'

export default {
    name: 'UserInfoBase',
    components: {
        PkUserInfoBase
    },
    props: {
        info: {
            type: String,
            required: true,
        }
    },
}
</script>

<style scoped>
.body-color {
    background-color: #272522;
}
.lightdark {
    background-color: #312E2B;
}
.user-color {
    color: rgb(255, 255, 255);
    font-size: 24px;
    font-weight: bolder;
    font-family: monospace;
}
.rating-float {
    float: right;
}

.user-margin {
    margin: 15px 15px 10px 70px;
}

.margin- {
    margin-top: 100px;
}
.offcanvas-size {
    width: 650px;
}
.img-size {
    border-radius: 50%;
    height: 100px;
    width: 100px;
}
.img-float {
    float: left;
}
</style>