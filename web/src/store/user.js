import $ from 'jquery';

export default {
    state: {
        id: "",
        username: "",
        photo: "",
        token: "",
        is_login: false,
        pulling_info: true,  // 是否正在从云端拉取信息
        rating: 0,
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.rating = user.rating;
            state.is_login = user.is_login;
        },
        updateToken(state, token) {
            state.token = token;
        },
        logout(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.token = "";
            state.is_login = false;
        },
        updatePullingInfo(state, pulling_info) {
            state.pulling_info = pulling_info;
        }

    },
    actions: {
        login(context, datas) {
            $.ajax({
                url: "http://127.0.0.1:8090/user/account/token/",
                type: "post",
                data: {
                    username: datas.username,
                    password: datas.password,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        // localStorage.setItem("jwt_token", resp.token);
                        context.commit('updateToken', resp.token);
                        datas.success(resp);
                    } else {
                        datas.error(resp);
                    }
                },
                error(resp) {
                    datas.error(resp);
                }
            });
        },
        getInfo(context, datas) {
            $.ajax({
                url: "http://127.0.0.1:8090/user/account/info/",
                type: "post",
                headers: {
                    Authorization: "Bearer " + context.state.token,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        context.commit("updateUser", {
                            ...resp,
                            is_login: true,
                        });
                        datas.success(resp);
                    } else {
                        datas.success(resp);
                    }
                },
                error(resp) {
                    datas.error(resp);
                }
            });
        },
        logout(context) {
            localStorage.removeItem("jwt_token");
            context.commit('logout');
        }
    },
    modules: {

    }
}