<template>
    <div class="lightdark ">
        <div v-if="$store.state.pk.match_status === 'matching' " class="center-"> 
            <div class="card-background radius">
                <div class="center- margin-bottom">
                    <img class="img-size"  :src="$store.state.user.photo" alt="">
                </div>
                <span class="username-rating left-" >
                    {{ $store.state.user.username }}
                </span>
                <span class="username-rating right-">
                    1500
                </span>

            </div>
        </div>
    </div>
</template>
    
<script>
export default {
    name: 'Pkend',
    setup() {

}
}
</script>


<style scoped>


.radius {
    border-radius: 10px;
}
.lightdark {
    height: 904px;
    width: 100%;
    background-color: #312E2B;
}
.center- {
    display: flex;
    justify-content: center;
    align-content: center;

}
.card-background {
    padding: 40px;
    margin-top: 100px;
    background-color:#272522;

    height: auto;
    width: calc(height) * 3 / 4;
}
.img-size {
    height: auto;
    width: auto;
    border-radius: 10px;
}
.radius {
    border-radius: 10px;
}
.margin-bottom {
    margin: 20px 25px 45px 20px
}
.username-rating {
    font-size: 30px;
    font-weight: bolder;
    color: blueviolet;
    height: auto;
    width: auto;
}
.left- {
    margin-right: 20px;
}
.right- {
    margin-left: 50px;
}
.time-size {
    font-size: 20px;
    color: azure;
    margin-top: 15px;
    position: absolute;
    bottom: 2px;
    left: 2px;
}
.button-size {
    font-size: 20px;
    height: 55px;
    width: 120px;
}
.margin-top {
    margin-top: 40px;
}
</style>