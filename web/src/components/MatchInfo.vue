<template>
    <div>
        <span class="margin-bottom">
            <img class="img-size" :src="info.photo" alt="">
        </span>
        <div class="username-rating " >
            {{ info.name }}
        </div>
        <span >
            <img v-if="info.direction === 1" class="piece-size" :src="getImageUrl('wp.png')" alt="">
            <img v-else-if="info.direction === -1" class="piece-size" :src="getImageUrl('bp.png')" alt="">
        </span>
    </div>
</template>

<script>
export default {
    name: 'MatchSuccess',
    props: {
        info: {
            type: Object,
            required: true,
        }
    },
    setup() {

        const getImageUrl = (path) => {
            return require('../../public/images/pieces/' + path);
        };

        return {
            getImageUrl,
        }
    }
}
</script>

<style scoped>


.img-size {
    height: 100px;
    width: 100px;
}

.piece-size {
    height: 40px;
    width: 40px;
}
.piece-size {   
    margin: 10px 0px 0px 47px;
    /* display: flex;
    justify-content: center;
    align-content: center; */
}

.margin-bottom {
    margin: 20px 15px 45px 20px;
}
.username-rating {
    margin-top: 10px;
    font-size: 20px;
    font-weight: bolder;
    color: blueviolet;
    text-align: center;
    height: auto;
    width: auto;
}
</style>
