export default {
    state: {
        opponent_username: "",
        opponent_photo: "",
        opponent_rating: "",
        a_direction: 0,
        b_direction: 0,
        a_id: 0,
        b_id: 0,
        game_obj: null,
        move_step: null,
    },
    getters: {
    },
    mutations: {
        updateOpponent(state, opponent) {
            state.opponent_username = opponent.username;
            state.opponent_photo = opponent.photo;
        },
        updateGame(state, game) {
            state.a_direction = game.a_direction;
            state.b_direction = game.b_direction;
            state.a_id = game.a_id;
            state.b_id = game.b_id;
            state.move_step = game.move_step;
        },
        updateReplayGameOBJ(state, game_obj) {
            state.game_obj = game_obj;
        }
    },
    actions: {
    },
    modules: {
    }
}
