// User types
export interface User {
  id: number;
  username: string;
  password: string;
  photo: string;
  rating: number;
}

// Game types
export interface Game {
  a_id: number;
  b_id: number;
  a_direction: number;
  b_direction: number;
  pieces_list: Piece[];
  current_player_id?: number;
  winner_id?: number;
}

export interface Piece {
  id: number;
  type: string;
  color: string;
  x: number;
  y: number;
  direction: number;
}

// Message types
export interface Message {
  id: number;
  content: string;
  render: string;
}

// Record types
export interface Record {
  id: number;
  a_id: number;
  b_id: number;
  a_name: string;
  b_name: string;
  a_rating: number;
  b_rating: number;
  status: string;
  create_time: string;
  steps: string;
}

// Friend types
export interface Friend {
  id: number;
  user_id: number;
  friend_id: number;
  friend_name: string;
  friend_photo: string;
  friend_rating: number;
}

// WebSocket event types
export type WebSocketEvent =
  | "start-matching"
  | "stop-matching"
  | "send-message"
  | "send-move"
  | "finished";

// WebSocket message types
export interface WebSocketMessage {
  event: WebSocketEvent;
  [key: string]: any;
}
