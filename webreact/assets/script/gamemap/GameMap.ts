import { GameObject } from "@/assets/script/GameObject";
import { ControllerBase } from "../controller/ControllerBase";
import { Pawn } from "../gamepieces/Pawn";
import { Bishop } from "../gamepieces/Bishop";
import { King } from "../gamepieces/King";
import { Knight } from "../gamepieces/Knight";
import { Queen } from "../gamepieces/Queen";
import { Rook } from "../gamepieces/Rook";
import { Store } from "../gamepieces/PiecesObject";

export interface PieceConfig {
  direction: number;
  row: number;
  col: number;
  image: string;
  survive: boolean;
}

export interface Piece {
  row: number;
  col: number;
  survive: boolean;
  setL(L: number): void;
}

export interface CanvasRef {
  value: HTMLCanvasElement;
}

export class GameMap extends GameObject {
  ctx: CanvasRenderingContext2D | null;
  parent: HTMLElement | null;
  canvas: CanvasRef;
  rows: number;
  cols: number;
  pieces_list: (Piece | undefined)[];
  L: number;
  TL: number;
  store: Store;
  direction: number;
  mouse_event: ControllerBase;

  constructor(canvas: CanvasRef, parent: HTMLElement | null, store: Store) {
    super();

    this.ctx = canvas.value.getContext("2d");
    this.parent = parent;
    this.canvas = canvas;
    this.rows = 8;
    this.cols = 8;
    this.pieces_list = [];
    this.L = 0;
    this.TL = 0;
    this.store = store;
    this.direction = 0;
    this.mouse_event = new ControllerBase(this.canvas, this);
  }

  start(): void {
    const user_id = parseInt(this.store.state.user?.id || "0");
    const pk = this.store.state.pk;
    const [a_id, a_direction, b_id, b_direction] = [
      parseInt(pk.a_id || "0"),
      parseInt(pk.a_direction || "0"),
      parseInt(pk.b_id || "0"),
      parseInt(pk.b_direction || "0"),
    ];

    if (user_id === a_id) {
      this.direction = a_direction;
    } else if (user_id === b_id) {
      this.direction = b_direction;
    }

    this.create_pieces();
  }

  create_pieces(): void {
    const pieces_list = this.store.state.pk.pieces_list || [];

    for (let obj of pieces_list) {
      const idx =
        this.direction === 1
          ? parseInt(obj.idx)
          : this.reversal(parseInt(obj.idx));

      const piece_name = obj.pieceName;
      const direction = parseInt(obj.direction);

      const imgsrc =
        direction === this.direction
          ? this.direction === 1
            ? "w"
            : "b"
          : this.direction === 1
            ? "b"
            : "w";

      if (piece_name === "pawn") {
        this.pieces_list[idx] = new Pawn(
          {
            direction: direction,
            row: Math.floor(idx / 8),
            col: idx % 8,
            image: process.env.BASE_URL + `images\\pieces\\${imgsrc}p.png`,
            survive: true,
          },
          this.ctx,
          this.store,
        );
      } else if (piece_name === "rook") {
        this.pieces_list[idx] = new Rook(
          {
            direction: direction,
            row: Math.floor(idx / 8),
            col: idx % 8,
            image: process.env.BASE_URL + `images\\pieces\\${imgsrc}r.png`,
            survive: true,
          },
          this.ctx,
          this.store,
        );
      } else if (piece_name === "knight") {
        this.pieces_list[idx] = new Knight(
          {
            direction: direction,
            row: Math.floor(idx / 8),
            col: idx % 8,
            image: process.env.BASE_URL + `images\\pieces\\${imgsrc}n.png`,
            survive: true,
          },
          this.ctx,
          this.store,
        );
      } else if (piece_name === "bishop") {
        this.pieces_list[idx] = new Bishop(
          {
            direction: direction,
            row: Math.floor(idx / 8),
            col: idx % 8,
            image: process.env.BASE_URL + `images\\pieces\\${imgsrc}b.png`,
            survive: true,
          },
          this.ctx,
          this.store,
        );
      } else if (piece_name === "queen") {
        this.pieces_list[idx] = new Queen(
          {
            direction: direction,
            row: Math.floor(idx / 8),
            col: idx % 8,
            image: process.env.BASE_URL + `images\\pieces\\${imgsrc}q.png`,
            survive: true,
          },
          this.ctx,
          this.store,
        );
      } else if (piece_name === "king") {
        this.pieces_list[idx] = new King(
          {
            direction: direction,
            row: Math.floor(idx / 8),
            col: idx % 8,
            image: process.env.BASE_URL + `images\\pieces\\${imgsrc}k.png`,
            survive: true,
          },
          this.ctx,
          this.store,
        );
      }
    }
  }

  reversal(idx: number): number {
    const row = 7 - Math.floor(idx / 8);
    const col = 7 - (idx % 8);
    return row * 8 + col;
  }

  sync_idx(pre_idx: number, now_idx: number): void {
    const pre_ = this.reversal(pre_idx);
    const now_ = this.reversal(now_idx);

    if (
      this.pieces_list[pre_] !== undefined &&
      this.pieces_list[pre_] !== null
    ) {
      this.pieces_list[pre_].row = Math.floor(now_ / 8);
      this.pieces_list[pre_].col = now_ % 8;
    }

    if (
      this.pieces_list[now_] !== undefined &&
      this.pieces_list[now_] !== null
    ) {
      this.pieces_list[now_].survive = false;
    }

    this.pieces_list[now_] = this.pieces_list[pre_];

    this.pieces_list[pre_] = undefined;
  }

  update_size(): void {
    if (this.parent === null || this.ctx === null) return;
    this.L = Math.floor(
      Math.min(
        this.parent.clientHeight / this.rows,
        this.parent.clientWidth / this.cols,
      ),
    );
    this.ctx.canvas.width = this.L * this.cols;
    this.ctx.canvas.height = this.L * this.rows;

    this.TL = this.L / 4;
    const L = this.L;

    for (let obj of this.pieces_list) {
      if (obj === null || obj === undefined) continue;
      obj.setL(L);
    }
  }

  update(): void {
    this.update_size();
    this.render();
  }

  render(): void {
    if (!this.ctx) return;

    let color_even = "#EEEED2",
      color_odd = "#769656";
    for (let r = 0; r < this.rows; ++r) {
      for (let c = 0; c < this.cols; ++c) {
        if ((r + c) % 2 === 0) {
          this.ctx!.fillStyle = color_even;
        } else {
          this.ctx!.fillStyle = color_odd;
        }
        this.ctx!.fillRect(c * this.L, r * this.L, this.L, this.L);
      }
    }

    let subtext: string;
    for (let r = 0; r < this.rows; ++r) {
      subtext = String(8 - r);
      if (r % 2 === 0) {
        this.ctx!.fillStyle = color_odd;
      } else {
        this.ctx!.fillStyle = color_even;
      }
      this.ctx!.font = "15px Arial";
      this.ctx!.fillText(subtext, 2, r * this.L + this.TL);
    }

    for (let c = 0, r = this.rows - 1; c < this.cols; ++c) {
      subtext = String.fromCharCode(97 + c);
      if ((r + c) % 2 === 0) {
        this.ctx!.fillStyle = color_odd;
      } else {
        this.ctx!.fillStyle = color_even;
      }
      this.ctx!.font = "15px Arial";
      this.ctx!.fillText(
        subtext,
        (c + 1) * this.L - this.TL * 0.6,
        (r + 1) * this.L - this.TL * 0.45,
      );
    }
  }
}
