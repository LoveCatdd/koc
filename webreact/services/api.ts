import axios from "axios";
import type { User, Record, Friend } from "@/types";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth APIs
export const login = async (
  username: string,
  password: string,
): Promise<{ token: string }> => {
  const response = await api.post("/user/account/token/", {
    username,
    password,
  });
  return response.data;
};

export const register = async (
  username: string,
  password: string,
): Promise<{ message: string }> => {
  const response = await api.post("/user/account/register/", {
    username,
    password,
  });
  return response.data;
};

export const getUserInfo = async (token: string): Promise<User> => {
  const response = await api.get("/user/account/info/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Game APIs
export const startGame = async (aId: number, bId: number): Promise<string> => {
  const response = await api.post("/pk/start/game/", {
    a_id: aId,
    b_id: bId,
  });
  return response.data;
};

// Record APIs
export const getRecordList = async (userId: number): Promise<Record[]> => {
  const response = await api.get(`/record/list/?user_id=${userId}`);
  return response.data;
};

// Friend APIs
export const addFriend = async (
  userId: number,
  friendId: number,
): Promise<{ message: string }> => {
  const response = await api.post("/friend/add/", {
    user_id: userId,
    friend_id: friendId,
  });
  return response.data;
};

export const deleteFriend = async (
  userId: number,
  friendId: number,
): Promise<{ message: string }> => {
  const response = await api.post("/friend/delete/", {
    user_id: userId,
    friend_id: friendId,
  });
  return response.data;
};

export const getFriends = async (userId: number): Promise<Friend[]> => {
  const response = await api.get(`/friend/list/?user_id=${userId}`);
  return response.data;
};

// Ranklist APIs
export const getRankList = async (): Promise<User[]> => {
  const response = await api.get("/ranklist/");
  return response.data;
};

// Match APIs
export const startMatching = async (userId: number): Promise<{ message: string }> => {
  const response = await api.post("/pk/start/matching/", {
    user_id: userId,
  });
  return response.data;
};

export const stopMatching = async (userId: number): Promise<{ message: string }> => {
  const response = await api.post("/pk/stop/matching/", {
    user_id: userId,
  });
  return response.data;
};

// Game APIs
export const sendMove = async (gameId: string, userId: number, move: string): Promise<{ message: string }> => {
  const response = await api.post("/pk/move/", {
    game_id: gameId,
    user_id: userId,
    move: move,
  });
  return response.data;
};

export const getGameStatus = async (gameId: string): Promise<any> => {
  const response = await api.get(`/pk/status/?game_id=${gameId}`);
  return response.data;
};

export const finishGame = async (gameId: string, winnerId: number): Promise<{ message: string }> => {
  const response = await api.post("/pk/finish/", {
    game_id: gameId,
    winner_id: winnerId,
  });
  return response.data;
};

// Record APIs
export const getRecordDetail = async (recordId: number): Promise<Record> => {
  const response = await api.get(`/record/detail/?record_id=${recordId}`);
  return response.data;
};
