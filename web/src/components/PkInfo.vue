<template> 
<div>
    <div class="row">
        <div class="col-3 padding-">
            <img src="https://cdn.acwing.com/media/user/profile/photo/221303_lg_6d0dad88de.png" alt="无法显示" class="size- radius-">
        </div>
        <div class="col-9 padding-">
            <div class="container-">
                <div class="username- left-right">
                    {{ username }}
                </div>
                <div class="time-size "> 
                    时间：10:00
                </div>
            </div>
            <div class="title- left-right ">
                暂无称号
            </div>
        </div>
    </div>
    <i class="bi bi-person-circle icon-size icon-color"></i>
    <i class="bi bi-chat-text icon-size icon-color"></i>
    <i class="bi bi-slash-lg icon-size icon-color"></i>

</div>
</template>

<script>
export default {
    name: 'PkInfo',
    components: {

    },
    props: {
        username: {
            type: String,
            required: true,
        }
    },
    setup() {

    }
}
</script>

<style scoped>
.padding- {
    padding: 0px;
}
.col-3 {
    height: 115px;
    width: 115px;
    margin-left: 10px;
}
.radius- {
    border-radius: 15%;
    margin: 10px 0px 0px 15px;
}
.size- {
    width: 100px;
    height: 100px;
}
.username- {
    font-size: 24px;
    font-weight: bolder;
    color: blueviolet;
    margin-top: 15px;
    margin-left: 10px;
    margin-bottom: 10px;
}
.title- {
    font-size: 24px;
    font-weight: bolder;
    color:lightslategrey;
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    /* justify-content: center; */
    align-content: center;
}
.icon-size {
    font-size: 35px;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 5px;
}

.time-size {
    font-size: 26px;
    color: azure;
    font-weight: bolder;
    margin: 15px 10px 7px 0px;
}

.left-right {
    flex: 1;
}

.icon-color {
    color: azure;
}
.container- {
    display: flex;
}
</style>