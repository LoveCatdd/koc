import $ from 'jquery';

export default {
    state: {
        id: "",
        username: "",
        photo: "",
        token: "",
        is_login: false,

    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
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
                        context.commit('updateUser', {
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
            context.commit('logout');
        }
    },
    modules: {

    }
}