import { PiecesObject, Store } from "./PiecesObject";

export interface PawnInfo {
  image: string;
  row: number;
  col: number;
  direction: number;
  survive: boolean;
}

export class Pawn extends PiecesObject {
  path: string;

  constructor(
    info: PawnInfo,
    ctx: CanvasRenderingContext2D | null,
    store: Store,
  ) {
    super(ctx, store);

    this.piece_image = new Image();
    this.path = info.image;

    this.row = info.row;
    this.col = info.col;

    this.direction = info.direction;

    this.survive = info.survive;
  }

  kill_piece(x: number, y: number): boolean {
    if (x === this.local_r && y === this.local_c) return false;
    let idx = x * 8 + y;
    if (this.pieces_list[idx] === undefined) {
      return false;
    } else if (this.pieces_list[idx].direction === this.direction) {
      return false;
    } else {
      this.pieces_list[idx].survive = false;

      return true;
    }
  }

  check1(x: number, y: number): boolean {
    if (x === this.local_r && y === this.local_c) return false;
    let rowdef = (x - this.local_r) / Math.abs(x - this.local_r);
    let coldef = (y - this.local_c) / Math.abs(y - this.local_c);
    if (isNaN(coldef)) {
      coldef = 0;
    } else if (isNaN(rowdef)) {
      rowdef = 0;
    }

    let i = this.local_r + rowdef,
      j = this.local_c + coldef;
    let idx = i * 8 + j;
    while (i !== x + rowdef || j !== y + coldef) {
      if (this.pieces_list[idx] !== undefined) {
        return false;
      }
      i += rowdef;
      j += coldef;
      idx = i * 8 + j;
    }

    return true;
  }

  move_piece(x: number, y: number): boolean {
    const rowdef = x - this.local_r;
    const coldef = Math.abs(y - this.local_c);
    const rowbool = rowdef === -1;
    const colbool = y === this.local_c;
    if (rowbool && colbool && this.check1(x, y)) {
      return true;
    } else if (this.local_r === 6 && rowdef === -2 && this.check1(x, y)) {
      return true;
    } else if (rowbool && coldef === 1 && this.kill_piece(x, y)) {
      return true;
    }
    return false;
  }

  start(): void {
    if (this.piece_image) {
      this.piece_image.src = this.path;
    }
  }
}
