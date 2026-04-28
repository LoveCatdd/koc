export interface User {
  id: number;
  username: string;
  password: string;
  photo: string;
  rating: number;
}

export interface Player {
  id: number;
  direction: number;
}

export interface ChessPiece {
  id: number;
  type: PieceType;
  color: PieceColor;
  x: number;
  y: number;
  direction: number;
}

export type PieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
export type PieceColor = "white" | "black";

export interface Game {
  a_id: number;
  b_id: number;
  a_direction: number;
  b_direction: number;
  pieces_list: ChessPiece[];
  current_player_id?: number;
  winner_id?: number;
}

export interface Message {
  id: number;
  content: string;
  render: string;
}

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

export interface Friend {
  id: number;
  user_id: number;
  friend_id: number;
  friend_name: string;
  friend_photo: string;
  friend_rating: number;
}

export interface Step {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  fromIdx: number;
  toIdx: number;
}

export type WebSocketEvent =
  | "start-matching"
  | "stop-matching"
  | "send-message"
  | "send-move"
  | "finished";

export interface WebSocketMessage {
  event: WebSocketEvent;
  [key: string]: any;
}

export function idxToXY(idx: number): { x: number; y: number } {
  return {
    x: idx % 8,
    y: Math.floor(idx / 8),
  };
}

export function xyToIdx(x: number, y: number): number {
  return y * 8 + x;
}

export function parseSteps(stepsStr: string): Step[] {
  if (!stepsStr) return [];
  const steps: Step[] = [];
  const stepPairs = stepsStr.split("&").filter((s) => s.length > 0);

  for (const pair of stepPairs) {
    const parts = pair.split("-");
    if (parts.length !== 2) continue;

    const id = parseInt(parts[0]);
    const indices = parts[1].split(",");
    if (indices.length !== 2) continue;

    const fromIdx = parseInt(indices[0]);
    const toIdx = parseInt(indices[1]);
    const from = idxToXY(fromIdx);
    const to = idxToXY(toIdx);

    steps.push({
      fromX: from.x,
      fromY: from.y,
      toX: to.x,
      toY: to.y,
      fromIdx,
      toIdx,
    });
  }

  return steps;
}

export function getInitialPieces(): ChessPiece[] {
  const pieces: ChessPiece[] = [];

  const pieceTypes: PieceType[] = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];

  for (let i = 0; i < 8; i++) {
    pieces.push({
      id: i + 1,
      type: pieceTypes[i],
      color: "white",
      x: i,
      y: 0,
      direction: 1,
    });
    pieces.push({
      id: i + 9,
      type: "pawn",
      color: "white",
      x: i,
      y: 1,
      direction: 1,
    });
    pieces.push({
      id: i + 17,
      type: "pawn",
      color: "black",
      x: i,
      y: 6,
      direction: -1,
    });
    pieces.push({
      id: i + 25,
      type: pieceTypes[i],
      color: "black",
      x: i,
      y: 7,
      direction: -1,
    });
  }

  return pieces;
}
