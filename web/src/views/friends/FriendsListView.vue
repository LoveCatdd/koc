<template>
    <section class="p-6">
        <nav class="container">
            <!-- <div class="col-12 container" background-color: black"></div> -->
            <div class="row">
                <div class="col-3 div-">
                    <div class="profile">
                        <img src="../../../public/images/logo2.png" alt="Avatar">
                        <h2>John Smith</h2>
                    </div>
                    <div class="div1">
                        <ul id="menu list-tab" class="list-group">
                            <li class="friend-wrapper list-group-item">
                                <span style="flex-grow: 1;">我的好友</span>
                                <i class="bi bi-plus-circle float-end" @click="showGroupModal('添加分组', 0)" id="add"></i>
                            </li>
                        </ul>
                        <nav class="scroll-container-">
                            <ul id="menu list-tab" class="list-group ">
                                <template v-if="groups.group.length != 0">
                                    <template v-for="group in groups.group" :key="group.id">
                                        <li class="friend-wrapper list-group-item list-group-item-action active"
                                            data-bs-toggle="list" v-if="group.id == 0" @click="cgroup(0)"><span>{{
                                                group.name }}</span>
                                        </li>
                                        <li class="friend-wrapper list-group-item list-group-item-action"
                                            data-bs-toggle="list" v-else @click="cgroup(group.id)">
                                            <span style="flex-grow: 1;">{{ group.name }}</span>
                                            <div id="chose" class="btn-group">
                                                <i class="bi bi-list" type="button" data-bs-toggle="dropdown"
                                                    aria-expanded="false" id="change"></i>
                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li><a class="dropdown-item"
                                                            @click="showGroupModal('修改名称', group.id)">修改名称</a>
                                                    </li>
                                                    <li><a class="dropdown-item" @click="deleteGroup(group)">删除</a></li>
                                                </ul>
                                            </div>
                                        </li>
                                    </template>
                                </template>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="col-8 div-">
                    <div class="div1" style="height: 790px;">
                        <ul class="list-group">
                            <li
                                class="list-group-item d-flex justify-content-between align-items-center friend-wrapper wi-">
                                <template v-if="groups.group.length != 0">
                                    <span style="flex-grow: 1;">{{ groups.group[clickgs].name }}</span>
                                </template>
                                <div class="input-group" style="width: 250px;">
                                    <input type="text" v-model="searchValue" class="form-control float-end"
                                        placeholder="请输入需要查找的好友名称" @input="sreachf">
                                </div>
                            </li>
                        </ul>
                        <nav class="scroll-container-" style="max-height: 765px; height: 765px;">
                            <ul class="list-group">
                                <template
                                    v-for="item in searchResults.searchres.length > 0 ? searchResults.searchres : friends.friend"
                                    :key="item.id">
                                    <template
                                        v-if="(searchResults.searchres.length > 0 && item.groupid == clickg) || (searchValue == '' && item.groupid == clickgs)">
                                        <li id="fr-"
                                            class="list-group-item d-flex justify-content-between align-items-center wi-">
                                            <img :src="item.photo" class="friend-text">
                                            <span style="flex-grow: 1;">{{ item.friendname }}</span>
                                            <span v-if="item.messages === 0">
                                            </span>
                                            <span class="badge bg-primary rounded-pill" v-else>{{ item.messages
                                            }}</span>
                                            <div id="chose" class="btn-group" style="margin-left: 10px;">
                                                <i class="bi bi-three-dots-vertical" type="button" data-bs-toggle="dropdown"
                                                    aria-expanded="false" id="change"></i>
                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li><a class="dropdown-item" @click="deleteFriend(item)">删除好友</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </template>
                                </template>
                                <template v-if="searchValue != '' && searchResults.searchres.length == 0">
                                    <div>
                                        <h3 class="input-wrapper" style="color: gray;">无搜索结果</h3>
                                    </div>
                                </template>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </nav>
    </section>
    <div v-if="showModal" class="modal">
        <div class="modal-header" style="background-color: azure;">
            <h2 class="modal-title">{{ title }}</h2>
            <span class="close" style="font-size:20px;" @click="closeModal">&times;</span>
        </div>
        <div class="input-wrapper">
            <input type="text" v-model="newGroupName" placeholder="输入名称">
            <button v-if="title == '添加分组'" @click="addGroup">确认</button>
            <button v-else @click="changeGroup">确认</button>
        </div>
    </div>
</template>
  


<script>
import { reactive, ref } from 'vue';
import { useStore } from "vuex";
import $ from 'jquery';
export default {
    setup() {
        const store = useStore();
        let clickgs = ref(0);
        let clickg = ref(0);//目前无用
        let num = ref(null);// 识别id
        let title = ref('');
        let searchValue = ref('');
        let showModal = ref(false);
        let newGroupName = ref('');
        const groups = reactive({
            count: 0,
            group: [
            ],
        });
        const searchResults = reactive({
            count: 0,
            searchres: [
            ],
        });
        const friends = reactive({
            count: 0,
            friend: [
            ],
        });
        const initgroup = () => {
            console.log("initgrounp run");
            $.ajax({
                url: 'http://127.0.0.1:8090/user/group/getgroups/',
                type: "get",
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {

                    console.log(resp);
                },
                error(resp) {
                    console.log(resp);
                }
            })
        }
        const initfriends = () => {
            console.log("initfriends run");
            $.ajax({
                url: 'http://127.0.0.1:8090/user/friend/getfriends/',
                type: "get",
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    const data = JSON.parse(resp.data);
                    [friends.friend.id, friends.friend.photo, friends.friend.friendname] = data.split(' ');
                },
                error(resp) {
                    console.log(resp);
                }
            })

        }
        const cgroup = (cid) => {
            clickgs.value = cid;
            searchValue.value = '';
            searchResults.searchres = [];
            // $.ajax({
            //     url: 'http://localhost/api/getfriends',
            //     data: {
            //         groupid: cid
            //     },
            //     success(resp) {
            //         const data = JSON.parse(resp.data);
            //         [friends.friend.id, friends.friend.photo, friends.friend.friendname, friends.friend.messages,] = data.split(' ');
            //     }
            // })
        };
        const showGroupModal = (titles, index) => {
            title.value = titles;
            num.value = index;
            showModal.value = true;
        };
        const closeModal = () => {
            // 关闭弹窗并重置输入框
            showModal.value = false;
            newGroupName.value = '';
            num.value = 0;
            clickgs.value = 0;
        };

        const addGroup = () => {
            if (groups.group.some(group => group.name === newGroupName.value)) {
                alert('分组名称已存在，请输入一个新的名称。');
                return;
            }
            else if (newGroupName.value.trim() === '') {
                alert('名称不能为空');
                return;
            }
            groups.count++;
            groups.group.push({ id: groups.count, name: newGroupName.value });
            console.log(groups);
            closeModal();
        };

        const deleteGroup = (group) => {
            // 向后端发送请求删除分组
            // $.ajax({
            //     success(resp) {
            //         const data = JSON.parse(resp.data);
            //     }
            // });
            // 根据groupId删除对应的分组
            groups.count--;

            groups.group = groups.group.filter((t) => t !== group);
        };

        const changeGroup = () => {
            groups.group[num.value].name = newGroupName.value;
            console.log(groups);
            closeModal();
        };

        const deleteFriend = (friend) => {
            friends.count--;
            friends.friend = friends.friend.filter((t) => t !== friend);
        };

        const sreachf = () => {
            searchResults.searchres = friends.friend.filter(friend => friend.friendname.includes(searchValue.value));
        }
        initgroup();
        initfriends();
        return {
            clickgs,
            clickg,
            num,
            title,
            showModal,
            searchValue,
            newGroupName,
            searchResults,
            friends,
            groups,
            cgroup,
            changeGroup,
            deleteGroup,
            addGroup,
            closeModal,
            showGroupModal,
            deleteFriend,
            sreachf,
            initgroup,
            initfriends
        }
    },

};
</script>



<style scoped>
.div- {
    border-radius: 1%;
    margin: 15px;
    height: 850px;
    background-color: azure;
}


.profile {
    display: flex;
    text-align: center;
}

.profile img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 10px;
}

a {
    text-decoration: none;
    color: gray;
}

.scroll-container- {
    max-height: 700px;
    height: 700px;
    overflow-y: auto;
}

#paging {
    margin: 5px;
    display: flex;
    justify-content: center;
}

a:hover,
a:active {
    color: rgb(75, 75, 75);
}


.profile h2 {
    font-size: 15px;
    font-weight: bold;
    margin-top: 70px;
}

.div1 {
    height: 720px;
    border-radius: 2%;
    background-color: #ffffff;
    font-size: larger;
}

/* .div1 ul li i {
    width: 19.2px;
    height: 19.2px;
} */

i {
    display: flex;
    justify-content: center;
    align-content: center;
}

#chose:active {
    font-size: 20px;
}

#add:hover {
    background-color: rgb(212, 212, 212);
    border-radius: 50%;
    /* 鼠标滑过时的颜色 */
}

#add:active {
    background-color: gray;
    border-radius: 50%;
    /* 鼠标点击时的颜色 */
}

#fr- img {
    height: 60px;
    width: 60px;
}

.div1 ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.wi- {
    padding: 15px 30px;
}

.friend-wrapper {
    display: flex;
    align-items: center;
}

.friend-text {
    margin-right: 10px;
    /* 调整文本和图像之间的间距 */
}

.div2 {
    margin-top: 20px;
}

.div2 table {
    border-collapse: collapse;
    width: 100%;
}

.div2 th,
.div2 td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

.div2 th {
    background-color: #f0f0f0;
}

.modal {
    display: block;
    /* 初始状态下隐藏弹窗 */
    position: fixed;
    /* 固定定位，覆盖在内容上方 */
    left: 50%;
    top: 50%;
    width: 300px;
    height: 200px;
    transform: translate(-50%, -50%);
    /* 弹窗背景色 */
    border: 1px solid #ccc;
    /* 边框样式 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
    border-radius: 4px;
    /* 圆角边框 */
    /* background-color: rgba(0, 0, 0, 0.5); */
    background-color: rgba(255, 255, 255, 0.5);

    /* 半透明背景色 */
    z-index: 9999;
    /* 确保弹窗显示在其他元素之上 */
    justify-content: center;
    align-items: center;
    padding: 0px;
}

.modal-content {
    background-color: #fff;
    margin: 20% auto;
    /* 垂直和水平居中定位 */
    padding: 20px;
    max-width: 400px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-title {
    margin: 0px;
    font-size: 18px;
}

.input-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 10px;
    /* 调整输入框和按钮与其他内容之间的间距 */
}

.input-wrapper input,
.input-wrapper button {
    margin-right: 10px;
}

.close {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;

}
</style>