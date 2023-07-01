export default {
    state: {
        status: "matching",  // matching表示匹配界面，playing表示对战界面
        socket: null,
        opponent_username: "",
        opponent_photo: "",
        a_direction: 0,
        b_direction: 0,
        a_id: 0,
        b_id: 0,
        pieces_list: null,
        posts: [],
        game_obj: null,
    },
    getters: {
    },
    mutations: {
        updateSocket(state, socket) {
            state.socket = socket;
        },
        updateOpponent(state, opponent) {
            state.opponent_username = opponent.username;
            state.opponent_photo = opponent.photo;
        },
        updateStatus(state, status) {
            state.status = status;
        },
        updateDirection(state, direction) {
            state.direction = direction;
        },
        updateGame(state, game) {
            state.pieces_list = game.pieces_list;
            state.a_direction = game.a_direction;
            state.b_direction = game.b_direction;
            state.a_id = game.a_id;
            state.b_id = game.b_id;
        },
        updatePost(state, post) {
            state.posts.push(post);
        },
        updateGameOBJ(state, game_obj) {
            state.game_obj = game_obj;
        }
    },
    actions: {
    },
    modules: {
    }
}
