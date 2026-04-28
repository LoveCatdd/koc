import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ChessPiece } from "@/types";

export interface PkState {
  status: "matching" | "playing";
  socket: WebSocket | null;
  opponent_username: string;
  opponent_photo: string;
  opponent_rating: string;
  opponent_designation: string;
  a_direction: number;
  b_direction: number;
  a_id: number;
  b_id: number;
  pieces_list: ChessPiece[] | null;
  posts: any[];
  game_obj: any;
  action: string;
  match_status: "matching" | "matched" | "playing";
  game_status: "playing" | "finished";
  play_status: string;
  loser: number;
}

const initialState: PkState = {
  status: "matching",
  socket: null,
  opponent_username: "",
  opponent_photo: "",
  opponent_rating: "",
  opponent_designation: "暂无称号",
  a_direction: 0,
  b_direction: 0,
  a_id: 0,
  b_id: 0,
  pieces_list: null,
  posts: [],
  game_obj: null,
  action: "",
  match_status: "matching",
  game_status: "playing",
  play_status: "",
  loser: 0,
};

const pkSlice = createSlice({
  name: "pk",
  initialState,
  reducers: {
    updateSocket: (state, action: PayloadAction<WebSocket | null>) => {
      state.socket = action.payload;
    },
    updateOpponent: (
      state,
      action: PayloadAction<{ username: string; photo: string }>,
    ) => {
      state.opponent_username = action.payload.username;
      state.opponent_photo = action.payload.photo;
    },
    updateStatus: (state, action: PayloadAction<"matching" | "playing">) => {
      state.status = action.payload;
    },
    updateMatchStatus: (
      state,
      action: PayloadAction<"matching" | "matched" | "playing">,
    ) => {
      state.match_status = action.payload;
    },
    updateDirection: (state, action: PayloadAction<number>) => {
      state.a_direction = action.payload;
    },
    updateGame: (
      state,
      action: PayloadAction<{
        pieces_list: ChessPiece[];
        a_direction: number;
        b_direction: number;
        a_id: number;
        b_id: number;
      }>,
    ) => {
      state.pieces_list = action.payload.pieces_list;
      state.a_direction = action.payload.a_direction;
      state.b_direction = action.payload.b_direction;
      state.a_id = action.payload.a_id;
      state.b_id = action.payload.b_id;
    },
    updatePost: (state, action: PayloadAction<any>) => {
      state.posts.push(action.payload);
    },
    updateLoser: (state, action: PayloadAction<number>) => {
      state.loser = action.payload;
    },
    updateGameOBJ: (state, action: PayloadAction<any>) => {
      state.game_obj = action.payload;
    },
    updateAction: (state, action: PayloadAction<string>) => {
      state.action = action.payload;
    },
    updatePlayStatus: (state, action: PayloadAction<string>) => {
      state.play_status = action.payload;
    },
    updateGameStatus: (
      state,
      action: PayloadAction<"playing" | "finished">,
    ) => {
      state.game_status = action.payload;
    },
    updatePk: (state) => {
      state.socket = null;
      state.opponent_username = "";
      state.opponent_photo = "";
      state.a_direction = 0;
      state.b_direction = 0;
      state.a_id = 0;
      state.b_id = 0;
      state.pieces_list = null;
      state.posts = [];
      state.game_obj = null;
    },
  },
});

export const {
  updateSocket,
  updateOpponent,
  updateStatus,
  updateMatchStatus,
  updateDirection,
  updateGame,
  updatePost,
  updateLoser,
  updateGameOBJ,
  updateAction,
  updatePlayStatus,
  updateGameStatus,
  updatePk,
} = pkSlice.actions;

export default pkSlice.reducer;
