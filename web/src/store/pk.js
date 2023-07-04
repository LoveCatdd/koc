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
        action: "",
        match_status: "matching",

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
        updateMatchStatus(state, match_status) {
            state.match_status = match_status;
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
        },
        updateAction(state, action) {
            state.action = action;
        },
        updatePk(state) {
            state.socket = null;
            state.opponent_username = "";
            state.opponent_photo = "";
            state.a_direction = 0;
            state.b_direction = 0;
            state.a_id = 0;
            state.b_id = 0;
            state.pieces_list = null;
            state.posts = [];
            state.game_obj.ctx = null;
            state.game_obj.parent = null;
            state.game_obj.canvas = null;
            state.game_obj.rows = null;
            state.game_obj.cols = null;
            for (let obj of state.game_obj.pieces_list)
                if (obj !== null || obj !== undefined) {
                    obj = null;
                }
            state.game_obj.L = 0;
            state.game_obj.TL = 0;
            state.game_obj.store = null;
            state.game_obj.direction = 0;
            state.game_obj.mouse_event = null;
            state.game_obj = null;
        }

    },
    actions: {
    },
    modules: {
    }
}
