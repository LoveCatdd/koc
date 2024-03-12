<template>
<div class="lightdark offcanvas offcanvas-end offcanvas-size" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-body margin- body-color">
        <img class="img-size img-float" :src="photo" alt="">        
        <div class="user-margin">
            <div class="rating-float user-color">{{ rating }}</div>
            <div  class="user-margin user-color">{{ name }}</div>
            <div class="user-margin user-color">{{ designation }}</div>
        </div>
        <PkUserInfoBase :info="info" />
    </div>
</div>
</template>

<script>
import { computed } from 'vue'

import PkUserInfoBase from './PkUserInfoBase.vue'

export default {
    name: 'UserInfoBase',
    components: {
        PkUserInfoBase
    },
    props: {
        info: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
        let photo = computed(() => {return props.info.photo});
        let rating = computed(() => {return props.info.rating});
        let name = computed(() => {return props.info.name});
        let designation = computed(() => {return props.info.designation});
        
        return {
            photo,
            rating,
            name,
            designation
        }
    }
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